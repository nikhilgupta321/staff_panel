const Setting = require('../model/setting.model');

const list = async (req, res) => {
  try {
    let data = await Setting.findOne({where: {
      id: 1
    }})
    res.json(data)
  } catch (err) {
    console.error(err)
    return {error: err}
  }
}

const update = async (req, res) => {
  try {
    await Setting.update(req.body, {
      where: {
        id: 1
      }
    })
    res.json({message: 'Success'})
  } catch (err) {
    console.error(err)
    return {error: err}
  }
}

module.exports= { list, update }