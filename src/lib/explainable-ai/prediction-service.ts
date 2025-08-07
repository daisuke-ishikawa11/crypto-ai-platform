// Prediction service for explainable AI

import { createClient } from '@/lib/supabase/server';
import { 
  AIPrediction, 
  ReasoningStep, 
  FeatureImportance,
  ExplainableAnalysisRequest,
  PredictionType
} from './types';

export class ExplainablePredictionService {
  /**
   * Create a new prediction with explanation
   */
  async createPrediction(
    userId: string,
    request: ExplainableAnalysisRequest,
    prediction: Omit<AIPrediction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  ): Promise<AIPrediction> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('ai_predictions')
      .insert({
        user_id: userId,
        prediction_type: request.type,
        asset_symbol: request.assetSymbol,
        portfolio_id: request.portfolioId,
        prediction: prediction.prediction,
        confidence: prediction.confidence,
        time_horizon: prediction.timeHorizon,
        reasoning: prediction.reasoning,
        key_factors: prediction.keyFactors,
        supporting_data: prediction.supportingData,
        model_name: prediction.modelName,
        model_version: prediction.modelVersion,
        model_parameters: prediction.modelParameters,
        visualization_data: prediction.visualizationData
      })
      .select()
      .single();
      
    if (error) throw error;
    
    return this.mapDbToAIPrediction(data);
  }
  
  /**
   * Get prediction by ID
   */
  async getPrediction(predictionId: string): Promise<AIPrediction | null> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('ai_predictions')
      .select('*')
      .eq('id', predictionId)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    
    return this.mapDbToAIPrediction(data);
  }
  
  /**
   * Get user's predictions
   */
  async getUserPredictions(
    userId: string,
    type?: PredictionType,
    limit = 10
  ): Promise<AIPrediction[]> {
    const supabase = await createClient();
    
    let query = supabase
      .from('ai_predictions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (type) {
      query = query.eq('prediction_type', type);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return data.map(this.mapDbToAIPrediction);
  }
  
  /**
   * Add reasoning steps
   */
  async addReasoningSteps(
    predictionId: string,
    steps: Omit<ReasoningStep, 'id' | 'predictionId' | 'createdAt'>[]
  ): Promise<ReasoningStep[]> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('ai_reasoning_steps')
      .insert(
        steps.map(step => ({
          prediction_id: predictionId,
          step_order: step.stepOrder,
          step_type: step.stepType,
          description: step.description,
          input_data: step.inputData,
          output_data: step.outputData,
          confidence: step.confidence,
          impact_weight: step.impactWeight,
          explanation: step.explanation,
          visualization_type: step.visualizationType,
          visualization_config: step.visualizationConfig
        }))
      )
      .select();
      
    if (error) throw error;
    
    return data.map(this.mapDbToReasoningStep);
  }
  
  /**
   * Get reasoning steps for a prediction
   */
  async getReasoningSteps(predictionId: string): Promise<ReasoningStep[]> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('ai_reasoning_steps')
      .select('*')
      .eq('prediction_id', predictionId)
      .order('step_order');
      
    if (error) throw error;
    
    return data.map(this.mapDbToReasoningStep);
  }
  
  /**
   * Add feature importance data
   */
  async addFeatureImportance(
    predictionId: string,
    features: Omit<FeatureImportance, 'id' | 'predictionId' | 'createdAt'>[]
  ): Promise<FeatureImportance[]> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('ai_feature_importance')
      .insert(
        features.map(feature => ({
          prediction_id: predictionId,
          feature_name: feature.featureName,
          feature_category: feature.featureCategory,
          importance_score: feature.importanceScore,
          contribution_direction: feature.contributionDirection,
          current_value: feature.currentValue,
          historical_values: feature.historicalValues,
          threshold_values: feature.thresholdValues,
          explanation: feature.explanation
        }))
      )
      .select();
      
    if (error) throw error;
    
    return data.map(this.mapDbToFeatureImportance);
  }
  
  /**
   * Get feature importance for a prediction
   */
  async getFeatureImportance(predictionId: string): Promise<FeatureImportance[]> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('ai_feature_importance')
      .select('*')
      .eq('prediction_id', predictionId)
      .order('importance_score', { ascending: false });
      
    if (error) throw error;
    
    return data.map(this.mapDbToFeatureImportance);
  }
  
  // Mapping functions
  private mapDbToAIPrediction(data: Record<string, unknown>): AIPrediction {
    return {
      id: data.id as string,
      userId: data.user_id as string,
      predictionType: data.prediction_type as PredictionType,
      assetSymbol: data.asset_symbol as string | undefined,
      portfolioId: data.portfolio_id as string | undefined,
      prediction: data.prediction as AIPrediction['prediction'],
      confidence: data.confidence as number,
      timeHorizon: data.time_horizon as string | undefined,
      reasoning: data.reasoning as AIPrediction['reasoning'],
      keyFactors: data.key_factors as AIPrediction['keyFactors'],
      supportingData: data.supporting_data as AIPrediction['supportingData'],
      modelName: data.model_name as string,
      modelVersion: data.model_version as string | undefined,
      modelParameters: data.model_parameters as AIPrediction['modelParameters'],
      visualizationData: data.visualization_data as AIPrediction['visualizationData'],
      createdAt: data.created_at as string,
      updatedAt: data.updated_at as string
    };
  }
  
  private mapDbToReasoningStep(data: Record<string, unknown>): ReasoningStep {
    return {
      id: data.id as string,
      predictionId: data.prediction_id as string,
      stepOrder: data.step_order as number,
      stepType: data.step_type as ReasoningStep['stepType'],
      description: data.description as string,
      inputData: data.input_data as ReasoningStep['inputData'],
      outputData: data.output_data as ReasoningStep['outputData'],
      confidence: data.confidence as number | undefined,
      impactWeight: data.impact_weight as number | undefined,
      explanation: data.explanation as string | undefined,
      visualizationType: data.visualization_type as string | undefined,
      visualizationConfig: data.visualization_config as ReasoningStep['visualizationConfig'],
      createdAt: data.created_at as string
    };
  }
  
  private mapDbToFeatureImportance(data: Record<string, unknown>): FeatureImportance {
    return {
      id: data.id as string,
      predictionId: data.prediction_id as string,
      featureName: data.feature_name as string,
      featureCategory: data.feature_category as FeatureImportance['featureCategory'],
      importanceScore: data.importance_score as number,
      contributionDirection: data.contribution_direction as FeatureImportance['contributionDirection'],
      currentValue: data.current_value as FeatureImportance['currentValue'],
      historicalValues: data.historical_values as FeatureImportance['historicalValues'],
      thresholdValues: data.threshold_values as FeatureImportance['thresholdValues'],
      explanation: data.explanation as string | undefined,
      createdAt: data.created_at as string
    };
  }
} 