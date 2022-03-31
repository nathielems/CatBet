const get = async (req: any, res: any) => {
  res.json({ message: 'hello world with Typescript22' })
}

module.exports = {
  get
}