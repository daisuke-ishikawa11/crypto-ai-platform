-- Explainable AI schema
-- Store AI predictions with detailed reasoning and explanations

-- AI predictions table
CREATE TABLE IF NOT EXISTS ai_predictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  prediction_type TEXT NOT NULL CHECK (prediction_type IN ('market_analysis', 'risk_assessment', 'portfolio_optimization', 'trading_signal')),
  asset_symbol TEXT,
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  
  -- Prediction details
  prediction JSONB NOT NULL, -- Main prediction result
  confidence NUMERIC(3,2) CHECK (confidence >= 0 AND confidence <= 1),
  time_horizon TEXT, -- e.g., '1h', '24h', '7d', '30d'
  
  -- Reasoning and explanation
  reasoning JSONB NOT NULL, -- Detailed reasoning steps
  key_factors JSONB, -- Most important factors affecting the prediction
  supporting_data JSONB, -- Raw data used for prediction
  
  -- Model information
  model_name TEXT NOT NULL,
  model_version TEXT,
  model_parameters JSONB,
  
  -- Visualization data
  visualization_data JSONB, -- Data for charts and graphs
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reasoning steps table (for detailed breakdown)
CREATE TABLE IF NOT EXISTS ai_reasoning_steps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prediction_id UUID REFERENCES ai_predictions(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,
  step_type TEXT NOT NULL CHECK (step_type IN ('data_collection', 'preprocessing', 'feature_extraction', 'analysis', 'inference', 'validation')),
  
  -- Step details
  description TEXT NOT NULL,
  input_data JSONB,
  output_data JSONB,
  confidence NUMERIC(3,2),
  impact_weight NUMERIC(3,2), -- How much this step influenced the final prediction
  
  -- Explanation
  explanation TEXT,
  visualization_type TEXT, -- e.g., 'chart', 'heatmap', 'timeline'
  visualization_config JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Feature importance table
CREATE TABLE IF NOT EXISTS ai_feature_importance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prediction_id UUID REFERENCES ai_predictions(id) ON DELETE CASCADE,
  feature_name TEXT NOT NULL,
  feature_category TEXT CHECK (feature_category IN ('technical', 'fundamental', 'sentiment', 'macro', 'portfolio', 'risk')),
  
  -- Importance metrics
  importance_score NUMERIC(5,4) NOT NULL, -- 0 to 1
  contribution_direction TEXT CHECK (contribution_direction IN ('positive', 'negative', 'neutral')),
  
  -- Feature details
  current_value JSONB,
  historical_values JSONB,
  threshold_values JSONB, -- Values that would change the prediction
  
  -- Explanation
  explanation TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Counterfactual explanations table
CREATE TABLE IF NOT EXISTS ai_counterfactuals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prediction_id UUID REFERENCES ai_predictions(id) ON DELETE CASCADE,
  
  -- What-if scenario
  scenario_description TEXT NOT NULL,
  changed_features JSONB NOT NULL, -- Features and their changed values
  
  -- Alternative outcome
  alternative_prediction JSONB NOT NULL,
  confidence_change NUMERIC(3,2),
  
  -- Feasibility
  feasibility_score NUMERIC(3,2), -- How realistic is this scenario
  required_actions JSONB, -- What user needs to do to achieve this outcome
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prediction feedback table (for improving explanations)
CREATE TABLE IF NOT EXISTS ai_prediction_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prediction_id UUID REFERENCES ai_predictions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Feedback
  accuracy_rating INTEGER CHECK (accuracy_rating >= 1 AND accuracy_rating <= 5),
  explanation_clarity INTEGER CHECK (explanation_clarity >= 1 AND explanation_clarity <= 5),
  usefulness_rating INTEGER CHECK (usefulness_rating >= 1 AND usefulness_rating <= 5),
  
  -- Detailed feedback
  feedback_text TEXT,
  confusion_points JSONB, -- What parts were confusing
  helpful_aspects JSONB, -- What parts were helpful
  
  -- Outcome tracking
  actual_outcome JSONB, -- What actually happened
  outcome_matched BOOLEAN,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_ai_predictions_user_id ON ai_predictions(user_id);
CREATE INDEX idx_ai_predictions_type ON ai_predictions(prediction_type);
CREATE INDEX idx_ai_predictions_created_at ON ai_predictions(created_at DESC);
CREATE INDEX idx_ai_predictions_portfolio_id ON ai_predictions(portfolio_id);
CREATE INDEX idx_ai_reasoning_steps_prediction_id ON ai_reasoning_steps(prediction_id);
CREATE INDEX idx_ai_feature_importance_prediction_id ON ai_feature_importance(prediction_id);
CREATE INDEX idx_ai_counterfactuals_prediction_id ON ai_counterfactuals(prediction_id);
CREATE INDEX idx_ai_prediction_feedback_prediction_id ON ai_prediction_feedback(prediction_id);

-- Enable Row Level Security
ALTER TABLE ai_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_reasoning_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_feature_importance ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_counterfactuals ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_prediction_feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can only see their own predictions
CREATE POLICY "Users can view own predictions" ON ai_predictions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own predictions" ON ai_predictions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can view reasoning steps for their predictions
CREATE POLICY "Users can view reasoning steps" ON ai_reasoning_steps
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM ai_predictions
      WHERE ai_predictions.id = ai_reasoning_steps.prediction_id
      AND ai_predictions.user_id = auth.uid()
    )
  );

-- Users can view feature importance for their predictions
CREATE POLICY "Users can view feature importance" ON ai_feature_importance
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM ai_predictions
      WHERE ai_predictions.id = ai_feature_importance.prediction_id
      AND ai_predictions.user_id = auth.uid()
    )
  );

-- Users can view counterfactuals for their predictions
CREATE POLICY "Users can view counterfactuals" ON ai_counterfactuals
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM ai_predictions
      WHERE ai_predictions.id = ai_counterfactuals.prediction_id
      AND ai_predictions.user_id = auth.uid()
    )
  );

-- Users can provide feedback on their own predictions
CREATE POLICY "Users can create feedback" ON ai_prediction_feedback
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own feedback" ON ai_prediction_feedback
  FOR SELECT USING (auth.uid() = user_id);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ai_predictions_updated_at BEFORE UPDATE ON ai_predictions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 