const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  try {
    const findAllTags = await Tag.findAll({
      attributes: ["id", "tag_name"],
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });

    return res.json(findAllTags);
  } catch (err) {
    throw err;
  }
  // be sure to include its associated Product data
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  try {
    const findOneTag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "tag_name"],
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });

    return res.json(findOneTag);
  } catch (err) {
    throw err;
  }
  // be sure to include its associated Product data
});

router.post("/", (req, res) => {
  // create a new tag
  try {
    const createTag = await Tag.create({
      tag_name: req.body.tag_name,
    });

    return res.json(createTag);
  } catch (error) {
    throw error;
  }
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.json(updateTag);
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  try {
    const destroyTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json(destroyTag);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
