const Application = require('../models/Application');
const applicationSchema = require('../validators/applicationValidator');

exports.createApplication = async (req, res) => {
  try {
    // Валидация
    const { error } = applicationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Сохранение в БД
    Application.create(req.body, (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(201).json({ id: result.id });
    });

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};