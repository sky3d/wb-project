type RenkuResponseTypes = 'renga' | 'verse'

export type ConvertedResponse = {
  id: string,
  type: RenkuResponseTypes,
  attributes: any
}

export const convertToResponse = (resourceId: string, type: RenkuResponseTypes, item: any): ConvertedResponse => ({
  id: resourceId,
  type,
  attributes: item,
})
