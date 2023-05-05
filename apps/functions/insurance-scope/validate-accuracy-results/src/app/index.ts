import * as accuracyCheckRepository from '@squaredash/crud/accuracy-check';

export async function validateAccuracyResults() {
  return accuracyCheckRepository.findMany({
    include: {
      documents: true,
    },
  });
}
