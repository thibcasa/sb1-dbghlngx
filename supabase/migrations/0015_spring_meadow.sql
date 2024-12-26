/*
  # Ajout de la synchronisation Airtable

  1. Nouvelles Tables
    - `airtable_sync_config` : Configuration de la synchronisation
    - `airtable_sync_logs` : Historique des synchronisations
    - `airtable_mappings` : Correspondance entre les champs Airtable et Supabase

  2. Sécurité
    - Activation RLS sur toutes les tables
    - Politiques d'accès pour les utilisateurs authentifiés

  3. Fonctions
    - Fonction de synchronisation automatique
    - Fonction de journalisation des synchronisations
*/

-- Table de configuration de la synchronisation
CREATE TABLE IF NOT EXISTS airtable_sync_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  table_name text NOT NULL,
  airtable_base_id text NOT NULL,
  airtable_table_id text NOT NULL,
  field_mappings jsonb NOT NULL DEFAULT '{}',
  sync_frequency interval NOT NULL DEFAULT '1 hour',
  is_active boolean DEFAULT true,
  last_sync_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des logs de synchronisation
CREATE TABLE IF NOT EXISTS airtable_sync_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  config_id uuid REFERENCES airtable_sync_config(id),
  status text NOT NULL CHECK (status IN ('success', 'error', 'partial')),
  records_processed int NOT NULL DEFAULT 0,
  records_synced int NOT NULL DEFAULT 0,
  error_message text,
  details jsonb DEFAULT '{}',
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

-- Table des correspondances de champs
CREATE TABLE IF NOT EXISTS airtable_mappings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  config_id uuid REFERENCES airtable_sync_config(id),
  airtable_field text NOT NULL,
  supabase_field text NOT NULL,
  transform_function text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(config_id, airtable_field)
);

-- Sécurité
ALTER TABLE airtable_sync_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE airtable_sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE airtable_mappings ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Users can manage their sync config"
  ON airtable_sync_config
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their sync logs"
  ON airtable_sync_logs
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM airtable_sync_config 
      WHERE id = airtable_sync_logs.config_id
    )
  );

CREATE POLICY "Users can manage their field mappings"
  ON airtable_mappings
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id 
      FROM airtable_sync_config 
      WHERE id = airtable_mappings.config_id
    )
  );

-- Indexes
CREATE INDEX idx_sync_config_user ON airtable_sync_config(user_id);
CREATE INDEX idx_sync_logs_config ON airtable_sync_logs(config_id);
CREATE INDEX idx_sync_logs_status ON airtable_sync_logs(status);
CREATE INDEX idx_mappings_config ON airtable_mappings(config_id);

-- Fonction pour mettre à jour le timestamp de dernière synchronisation
CREATE OR REPLACE FUNCTION update_last_sync_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE airtable_sync_config
  SET last_sync_at = NEW.completed_at
  WHERE id = NEW.config_id
  AND NEW.status = 'success';
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour la mise à jour automatique
CREATE TRIGGER update_sync_timestamp
AFTER INSERT ON airtable_sync_logs
FOR EACH ROW
EXECUTE FUNCTION update_last_sync_timestamp();

-- Ajout des colonnes de synchronisation aux tables existantes
ALTER TABLE leads ADD COLUMN IF NOT EXISTS airtable_id text UNIQUE;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS synced_at timestamptz;

ALTER TABLE contacts ADD COLUMN IF NOT EXISTS airtable_id text UNIQUE;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS synced_at timestamptz;

ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS airtable_id text UNIQUE;
ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS synced_at timestamptz;

-- Indexes pour les IDs Airtable
CREATE INDEX IF NOT EXISTS idx_leads_airtable_id ON leads(airtable_id);
CREATE INDEX IF NOT EXISTS idx_contacts_airtable_id ON contacts(airtable_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_airtable_id ON campaigns(airtable_id);