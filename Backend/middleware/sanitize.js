const sanitizeHtml = require("sanitize-html");

/**
 * Reusable sanitize middleware for specific fields
 * @param {Array<string>} fieldsToSanitize - List of fields in req.body to sanitize
 * ตัวเช็คตัวแปรที่เข้ามา หรือกำลังออกไปว่า ฝั่ง Script หรือ HTML ไหม
 * ค่อยๆ เช็คไปทีละตัว
 */
function sanitizeBody(fieldsToSanitize) {
  return (req, res, next) => {
    // Sanitize query parameters
    fieldsToSanitize.forEach((field) => {
      if (req.query[field]) {
        req.query[field] = sanitizeHtml(req.query[field], {
          allowedTags: ["b", "i", "em", "strong", "a", "p"],
          allowedAttributes: {
            a: ["href"],
          },
        });
      }
    });

    // Sanitize URL params (if any)
    fieldsToSanitize.forEach((field) => {
      if (req.params[field]) {
        req.params[field] = sanitizeHtml(req.params[field], {
          allowedTags: ["b", "i", "em", "strong", "a", "p"],
          allowedAttributes: {
            a: ["href"],
          },
        });
      }
    });

    next();
  };
}

module.exports = { sanitizeBody };
