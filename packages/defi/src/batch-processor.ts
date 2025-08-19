// 🚀 DeFi Batch Processing System (package version)
// High-performance batch processing for DeFi protocol data collection

import { logger } from './logger';

export interface BatchProcessingConfig {
  batchSize: number;
  concurrency: number;
  retryAttempts: number;
  retryDelay: number; // milliseconds
  circuitBreakerThreshold: number;
  circuitBreakerTimeout: number; // milliseconds
}

export interface BatchJob<T, R> {
  id: string;
  data: T;
  processor: (data: T) => Promise<R>;
  priority: number;
  retries: number;
  createdAt: Date;
}

export interface BatchResult<T, R> {
  input: T;
  result?: R;
  error?: Error;
  success: boolean;
  duration: number;
  retries: number;
}

export interface BatchMetrics {
  totalJobs: number;
  successfulJobs: number;
  failedJobs: number;
  averageDuration: number;
  successRate: number;
  throughput: number; // jobs per second
}

export class BatchProcessor {
  private jobQueue: Array<BatchJob<unknown, unknown>> = [];
  private activeJobs = new Set<string>();
  private completedJobs = new Map<string, BatchResult<unknown, unknown>>();
  private metrics: BatchMetrics;
  private isProcessing = false;

  constructor(
    private readonly config: BatchProcessingConfig = {
      batchSize: 10,
      concurrency: 3,
      retryAttempts: 3,
      retryDelay: 1000,
      circuitBreakerThreshold: 5,
      circuitBreakerTimeout: 30000
    }
  ) {
    this.metrics = {
      totalJobs: 0,
      successfulJobs: 0,
      failedJobs: 0,
      averageDuration: 0,
      successRate: 0,
      throughput: 0
    };
  }

  addJob<T, R>(data: T, processor: (data: T) => Promise<R>, priority = 0): string {
    const id = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const job: BatchJob<T, R> = {
      id,
      data,
      processor,
      priority,
      retries: 0,
      createdAt: new Date()
    };

    const insertIndex = this.jobQueue.findIndex(existingJob => existingJob.priority < priority);
    const upcastJob = job as unknown as BatchJob<unknown, unknown>;
    if (insertIndex === -1) {
      this.jobQueue.push(upcastJob);
    } else {
      this.jobQueue.splice(insertIndex, 0, upcastJob);
    }

    logger.debug('Job added to batch queue', { jobId: id, queueSize: this.jobQueue.length });

    if (!this.isProcessing) {
      void this.startProcessing();
    }

    return id;
  }

  addBatch<T, R>(items: T[], processor: (data: T) => Promise<R>, priority = 0): string[] {
    return items.map(item => this.addJob(item, processor, priority));
  }

  private async startProcessing(): Promise<void> {
    if (this.isProcessing) return;

    this.isProcessing = true;
    const startTime = Date.now();

    logger.info('Batch processing started', {
      queueSize: this.jobQueue.length,
      concurrency: this.config.concurrency
    });

    try {
      while (this.jobQueue.length > 0 || this.activeJobs.size > 0) {
        while (this.activeJobs.size < this.config.concurrency && this.jobQueue.length > 0) {
          const job = this.jobQueue.shift()!;
          void this.processJob(job as BatchJob<unknown, unknown>);
        }

        if (this.activeJobs.size > 0) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      const totalDuration = Date.now() - startTime;
      this.updateMetrics(totalDuration);

      logger.info('Batch processing completed', {
        totalJobs: this.metrics.totalJobs,
        successRate: this.metrics.successRate,
        duration: totalDuration
      });
    } catch (error) {
      logger.error('Batch processing error', { error });
    } finally {
      this.isProcessing = false;
    }
  }

  private async processJob<T, R>(job: BatchJob<T, R>): Promise<void> {
    this.activeJobs.add(job.id);
    const startTime = Date.now();

    try {
      logger.debug('Processing job', { jobId: job.id });

      const result = await job.processor(job.data);
      const duration = Date.now() - startTime;

      const batchResult: BatchResult<T, R> = {
        input: job.data,
        result,
        success: true,
        duration,
        retries: job.retries
      };

      this.completedJobs.set(job.id, batchResult as BatchResult<unknown, unknown>);
      this.metrics.successfulJobs++;

      logger.debug('Job completed successfully', { jobId: job.id, duration: `${duration}ms` });
    } catch (error) {
      const duration = Date.now() - startTime;
      logger.warn('Job failed', {
        jobId: job.id,
        error: error instanceof Error ? error.message : 'Unknown error',
        retries: job.retries
      });

      if (job.retries < this.config.retryAttempts) {
        job.retries++;
        setTimeout(() => {
          this.jobQueue.unshift(job as unknown as BatchJob<unknown, unknown>);
        }, this.config.retryDelay * Math.pow(2, job.retries));

        logger.debug('Job scheduled for retry', {
          jobId: job.id,
          retries: job.retries,
          delay: this.config.retryDelay * Math.pow(2, job.retries)
        });
      } else {
        const batchResult: BatchResult<T, R> = {
          input: job.data,
          error: error instanceof Error ? error : new Error('Unknown error'),
          success: false,
          duration,
          retries: job.retries
        };

        this.completedJobs.set(job.id, batchResult as BatchResult<unknown, unknown>);
        this.metrics.failedJobs++;

        logger.error('Job failed permanently', { jobId: job.id, retries: job.retries });
      }
    } finally {
      this.activeJobs.delete(job.id);
      this.metrics.totalJobs++;
    }
  }

  getResult<T, R>(jobId: string): BatchResult<T, R> | null {
    return (this.completedJobs.get(jobId) as BatchResult<T, R> | undefined) || null;
  }

  getResults<T, R>(jobIds: string[]): Array<BatchResult<T, R> | null> {
    return jobIds.map(id => this.getResult<T, R>(id));
  }

  async waitForCompletion(timeout = 30000): Promise<BatchResult<unknown, unknown>[]> {
    const startTime = Date.now();
    while (this.isProcessing && Date.now() - startTime < timeout) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    if (this.isProcessing) throw new Error('Batch processing timeout');
    return Array.from(this.completedJobs.values());
  }

  private updateMetrics(totalDuration: number): void {
    const totalJobs = this.metrics.successfulJobs + this.metrics.failedJobs;
    this.metrics.totalJobs = totalJobs;
    this.metrics.successRate = totalJobs > 0 ? (this.metrics.successfulJobs / totalJobs) * 100 : 0;
    this.metrics.throughput = totalDuration > 0 ? (totalJobs / totalDuration) * 1000 : 0;

    const durations = Array.from(this.completedJobs.values()).map(result => result.duration);
    this.metrics.averageDuration = durations.length > 0 ? durations.reduce((sum, d) => sum + d, 0) / durations.length : 0;
  }
  getMetrics(): BatchMetrics { return { ...this.metrics }; }
  getStatus(): { queueSize: number; activeJobs: number; completedJobs: number; isProcessing: boolean } {
    return { queueSize: this.jobQueue.length, activeJobs: this.activeJobs.size, completedJobs: this.completedJobs.size, isProcessing: this.isProcessing };
  }
  reset(): void {
    this.completedJobs.clear();
    this.metrics = { totalJobs: 0, successfulJobs: 0, failedJobs: 0, averageDuration: 0, successRate: 0, throughput: 0 };
    logger.info('Batch processor reset');
  }
  static createBatches<T>(items: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < items.length; i += batchSize) batches.push(items.slice(i, i + batchSize));
    return batches;
  }
}
