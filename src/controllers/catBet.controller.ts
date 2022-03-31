const get = async (req: any, res: any) => {
  res.json({ message: 'hello world with Typescript2' })
}

module.exports = {
  get
}