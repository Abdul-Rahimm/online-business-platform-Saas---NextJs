import multiparty from "multiparty";

export default async function handle(req, res) {
  //we want to tell nextJS not to parse our req
  //we will parse it ourselves

  const form = new multiparty.Form();

  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);

      resolve({ fields, files });
    });
  });

  console.log("Length : ", files.file.length);
  return res.json("ok");
}

// this will not parse our request to JSON
export const config = {
  api: {
    bodyParser: false,
  },
};
