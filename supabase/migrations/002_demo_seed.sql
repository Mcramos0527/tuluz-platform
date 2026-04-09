-- ============================================================
-- TULUZ PLATFORM — DEMO SEED DATA
-- Migration 002: One complete demo course with 3 modules
-- NOTE: Run this AFTER 001_initial_schema.sql
-- ============================================================

-- Demo course: Emprendimiento Consciente — Fundamentos
INSERT INTO courses (id, title, description, slug, is_published, order_index)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Emprendimiento Consciente — Fundamentos',
  'Construye las bases de un negocio con impacto positivo real. En este curso aprenderás a definir tu propuesta de valor sostenible, validar tu modelo de negocio y comunicar tu impacto. Al completarlo tendrás tu Canvas de Negocio Consciente generado por IA.',
  'emprendimiento-consciente-fundamentos',
  true,
  1
);

-- Module 1: Propuesta de Valor con Impacto
INSERT INTO course_modules (
  id, course_id, title, content_type, content_url, content_summary,
  deliverable_type, deliverable_description, order_index
) VALUES (
  'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Propuesta de Valor con Impacto',
  'text',
  NULL,
  E'La propuesta de valor con impacto va más allá de resolver un problema comercial. Describe QUIÉN eres como emprendedora, QUÉ ofreces, PARA QUIÉN lo haces, y CÓMO generas valor positivo en el mundo.\n\nUna propuesta de valor con impacto tiene tres dimensiones:\n1. **Valor funcional**: ¿Qué problema resuelves?\n2. **Valor emocional**: ¿Cómo hace sentir a tu cliente?\n3. **Valor de impacto**: ¿Qué transformación generas en la comunidad o el planeta?\n\nLas empresas que integran el impacto en su propuesta de valor no solo son más resilientes, sino que atraen a clientes más comprometidos y relaciones más duraderas.\n\nEjemplo: "Ayudo a mujeres rurales a acceder a mercados digitales a través de productos artesanales sostenibles, generando autonomía económica y preservando el patrimonio cultural de sus comunidades."\n\nEsta semana reflexiona: ¿Para qué existe tu negocio más allá de generar ingresos? ¿Qué no existiría en el mundo si tu negocio no existiera?',
  'propuesta_de_valor',
  'Canvas de Propuesta de Valor con Impacto: describe tu propuesta de valor en sus tres dimensiones (funcional, emocional e impacto) aplicada a tu negocio específico',
  1
);

-- Module 2: Modelo de Negocio Sostenible
INSERT INTO course_modules (
  id, course_id, title, content_type, content_url, content_summary,
  deliverable_type, deliverable_description, order_index
) VALUES (
  'c3d4e5f6-a7b8-9012-cdef-123456789012',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Modelo de Negocio Sostenible',
  'text',
  NULL,
  E'Un modelo de negocio sostenible considera no solo cómo ganas dinero, sino cómo el dinero que ganas regenera valor en tu entorno.\n\nEl Business Model Canvas adaptado para impacto añade tres bloques al modelo tradicional:\n- **Métricas de impacto**: ¿Cómo mides el bien que generas?\n- **Beneficiarios indirectos**: ¿Quién más se beneficia además de tu cliente directo?\n- **Externalizaciones positivas**: ¿Qué valor crea tu negocio que no aparece en tus ingresos?\n\nLos modelos de negocio sostenibles más exitosos comparten una característica: el impacto está integrado en el modelo, no añadido encima de él.\n\nModos de integración del impacto:\n1. **Misión-driven**: el impacto ES el negocio (ej. empresa B)\n2. **Producto sostenible**: el producto mismo genera impacto (ej. materiales reciclados)\n3. **Proceso sostenible**: cómo produces genera el impacto (ej. cadena de valor justa)\n4. **Distribución de valor**: cómo distribuyes los beneficios genera impacto (ej. cooperativa)',
  'modelo_de_negocio',
  'Business Model Canvas Sostenible: los 9 bloques del canvas adaptados a tu negocio con énfasis en las métricas de impacto y beneficiarios indirectos',
  2
);

-- Module 3: Comunicación de Impacto y Pitch
INSERT INTO course_modules (
  id, course_id, title, content_type, content_url, content_summary,
  deliverable_type, deliverable_description, order_index
) VALUES (
  'd4e5f6a7-b8c9-0123-def0-234567890123',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Comunicación de Impacto y Pitch',
  'text',
  NULL,
  E'Comunicar tu impacto es tan importante como generarlo. Si nadie sabe el bien que haces, no puedes escalar ese bien.\n\nEl Pitch de Impacto tiene una estructura específica:\n1. **El problema**: presenta el problema desde lo humano, no desde lo estadístico\n2. **Tu solución**: explica qué haces de forma simple y memorable\n3. **Tu impacto**: datos concretos + historia de una persona real\n4. **Tu propuesta para el interlocutor**: qué quieres de quien escucha\n5. **Tu visión**: el mundo que imaginas si tu negocio crece\n\nReglas del pitch de impacto:\n- Un número concreto vale más que diez generalidades\n- Una historia de una persona vale más que un porcentaje\n- Tu pasión debe sentirse, no explicarse\n- El interlocutor debe saber exactamente qué esperas de él en los primeros 2 minutos\n\nPara inversores/compradores B2B añade siempre:\n- Métricas de impacto verificables\n- Cómo tu impacto ayuda a SU reputación ESG\n- Scalability del impacto',
  'pitch_de_impacto',
  'Pitch de Impacto (2 minutos): estructura completa del pitch de tu negocio incluyendo el problema, solución, impacto medible, y llamada a la acción personalizada',
  3
);

-- Storage bucket for badges (manual step in Supabase dashboard)
-- CREATE BUCKET badges WITH public = true;
