interface Model {
  createdAt: number
  updatedAt: number
  id: number
}

class Model implements Model {
  constructor(opt: Model) {
    this.id = opt.id
    this.createdAt = opt.createdAt
    this.updatedAt = opt.updatedAt
  }
}

export default Model