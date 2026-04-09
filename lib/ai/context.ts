import type { AIContext, GeneratedDeliverable, EntrepreneurProfile } from '@/types/database'

/**
 * Merge new module responses into the cumulative ai_context.
 */
export function mergeModuleResponses(
  existing: AIContext,
  moduleId: string,
  responses: string[]
): AIContext {
  return {
    ...existing,
    exam_responses: {
      ...(existing.exam_responses ?? {}),
      [moduleId]: responses,
    },
    last_updated: new Date().toISOString(),
  }
}

/**
 * Add or update a deliverable in ai_context.
 */
export function mergeDeliverable(
  existing: AIContext,
  moduleId: string,
  deliverableType: string,
  content: string
): AIContext {
  const deliverable: GeneratedDeliverable = {
    content,
    generated_at: new Date().toISOString(),
    module_id: moduleId,
    deliverable_type: deliverableType,
  }

  return {
    ...existing,
    deliverables: {
      ...(existing.deliverables ?? {}),
      [deliverableType]: deliverable,
    },
    last_updated: new Date().toISOString(),
  }
}

/**
 * Build a full context summary for the AI prompts.
 */
export function buildEntrepreneurContextForAI(
  profile: EntrepreneurProfile
): AIContext & {
  business_name: string
  sector: string | null
  country: string | null
  business_description: string | null
} {
  return {
    business_name: profile.business_name,
    sector: profile.sector,
    country: profile.country,
    business_description: profile.business_description,
    ...(profile.ai_context ?? {}),
  }
}

/**
 * Extract user messages (entrepreneur responses) from exam conversation.
 */
export function extractUserResponses(
  conversation: Array<{ role: string; content: string }>
): string[] {
  return conversation
    .filter((msg) => msg.role === 'user')
    .map((msg) => msg.content)
}
