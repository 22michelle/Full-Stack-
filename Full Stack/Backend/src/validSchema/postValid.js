export const postValid = {
  body: {
    type: "object",
    required: ["title", "description", "imgUrl"],
    properties: {
      title: {
        type: "string",
      },
      description: {
        type: "string",
      },
      imgUrl: {
        type: "string",
      },
    },
  },
};
