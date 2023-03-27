export interface ITour {
  id?: string,
  _id?: string,
  name: string,
  description: string,
  tourOperator: string
  price: string,
  img?: string,
  type: string,
  date: string
}

export type ToutType = 'Одиночный' | 'Групповой';

export interface ITourTypeSelect {
  label?: string,
  value?: string,
  date?: string
}

export interface INearestTour extends ITour {
  locationId: string,
}

export interface ITourLocation {
  id: string,
  name: string,
}

export interface INearestTourWithLocation extends INearestTour {
  region? : ITourLocation,
}
