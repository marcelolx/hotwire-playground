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

  return url
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

/**
 * Module: HTMLTableImport
 *
 * Extract tabulator attribute options.
 *
 * This implementation overrides the tabulator default implementation
 * to add the ability of extract attribute options which their values
 * are objects.
 *
 * To be able extract objects the correct way you need to define the
 * attribute value as a valid JSON object and starting with `object:`,
 * like `tabulator-property='object:{ "objKey": 1 }'`.
 *
 * Extracted from Tabulator https://github.com/olifolkerd/tabulator
 *
 * @param {HTMLElement} element
 * @param {Object} options
 * @param {Object} defaultOptions
 */
export function tabulatorExtractOptions (element, options, defaultOptions) {
  var attributes = element.attributes;
  var optionsArr = defaultOptions ? Object.assign([], defaultOptions) : Object.keys(options);
  var optionsList = {};

  optionsArr.forEach(function(item){
    optionsList[item.toLowerCase()] = item;
  });

  for(var index in attributes){
    var attrib = attributes[index];
    var name;

    if(attrib && typeof attrib == "object" && attrib.name && attrib.name.indexOf("tabulator-") === 0){
      name = attrib.name.replace("tabulator-", "");

      if(typeof optionsList[name] !== "undefined") {
        let attribValue = attrib.value
        const isAnObject = attribValue.startsWith("object:")
        if (isAnObject) {
          attribValue = JSON.parse(attribValue.replace("object:", ""))
        }

        options[optionsList[name]] = this._attribValue(attribValue);
      }
    }
  }
};
