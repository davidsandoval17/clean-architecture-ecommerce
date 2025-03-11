export interface IAdapter<Domain, Schema> {
  toDomain: (target: Schema) => Domain
  toPersistence: (target: Domain) => Schema
}
