import { response } from "../helpers/Response.js";
import { postModel } from "../models/post.model.js";

const postCtrl = {};

postCtrl.create = async (req, reply) => {
  try {
    const data = await postModel.create(req.body);
    response(reply, 201, true, data, "Post creado");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

postCtrl.listAll = async (req, reply) => {
  try {
    const data = await postModel.find();
    response(reply, 200, true, data, "Lista de posts");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

postCtrl.listById = async (req, reply) => {
  try {
    const { id } = req.params;
    const data = await postModel.findById(id);
    if (!data) {
      return response(reply, 404, false, "", "Registro no encontrado");
    }
    response(reply, 200, true, data, "Registro encontrado");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

postCtrl.delete = async (req, reply) => {
  try {
    const { id } = req.params;
    const data = await postModel.findById(id);
    if (!data) {
      return response(reply, 404, false, "", "Registro no encontrado");
    }

    await data.deleteOne();
    response(reply, 200, true, data, "Registro eliminado");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

postCtrl.update = async (req, reply) => {
  try {
    const { id } = req.params;
    const data = await postModel.findById(id);
    if (!data) {
      return response(reply, 404, false, "", "Registro no encontrado");
    }

    await data.updateOne(req.body);
    response(reply, 200, true, data, "Registro actualizado");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

export default postCtrl;
