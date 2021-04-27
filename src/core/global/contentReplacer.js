/**
 * Get a regex instance for replace elements.
 * @param {*} search_string String key.
 */
const regex = search_string => {
  return new RegExp(`#{${search_string}}#`, 'gi');
};

module.exports = (content_data, json) => {
  const keys = Object.keys(json);

  keys.forEach(key => {
    content_data = content_data.replace(regex(key), json[key]);
  });

  return content_data;
};
