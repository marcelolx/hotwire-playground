/**
 * Converts a FormData to a array of key/value.
 *
 * This allows us to create a URLSearchParams easily
 * with a form for GET requests.
 *
 * @param {FormData} formData
 * @returns Array<key, value>
 */
export function stringFormData (formData) {
  return [...formData].reduce((entries, [name, value]) => {
    return entries.concat(typeof value == 'string' ? [[name, value]] : [])
  }, [])
}

/**
 * Returns the "body" of a request based the form method and inputs.
 *
 * When the form method is GET then builds a URLSearchParams
 * with the input fields and their values.
 *
 * @param {HTMLFormElement} form
 * @returns {FormData | URLSearchParams}
 */
export function formBody (form) {
  const formData = new FormData(form)
  if (form.method === 'get') {
    return new URLSearchParams(stringFormData(formData))
  } else {
    return formData
  }
}

/**
 * Merges the `entries` with the `url` searchParams.
 *
 * @param {URL} url
 * @param {URLSearchParams | Record<string, string>} entries
 * @returns {URL} `url`
 */
export function mergeFormDataEntries (url, entries) {
  const currentSearchParams = new URLSearchParams(url.search)

  for (const [name, value] of entries) {
    if (value instanceof File) continue

    if (currentSearchParams.has(name)) {
      currentSearchParams.delete(name)
      url.searchParams.set(name, value)
    } else {
      url.searchParams.append(name, value)
    }
  }
}

/**
 * Generates an array with the params as key/value to be able create a URLSearchParams
 * and send them as they are to the server.
 *
 * Converts the bellow object:
 * {
 *   page: 1,
 *   sorters: [
 *     { field: "name", dir: "asc" }
 *   ]
 * }
 *
 * To this array:
 * [
 *   { key: "page", value: 1 },
 *   { key: "sorters[0][field]", value: "name" }
 *   { key: "sorters[0][dir]", value: "asc" }
 * ]
 *
 * Extracted from Tabulator https://github.com/olifolkerd/tabulator
 *
 * @param {Object | Array} data
 * @param {String} prefix
 * @returns {Array} Array with key/value objects of the params
 */
export function generateParamsList (data, prefix) {
  const _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }
  var output = [];

  prefix = prefix || "";

  if (Array.isArray(data)) {
    data.forEach(function (item, i) {
      output = output.concat(generateParamsList(item, prefix ? prefix + "[" + i + "]" : i));
    });
  } else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === "object") {
    for (var key in data) {
      output = output.concat(generateParamsList(data[key], prefix ? prefix + "[" + key + "]" : key));
    }
  } else {
    output.push({ key: prefix, value: data });
  }

  return output;
}
