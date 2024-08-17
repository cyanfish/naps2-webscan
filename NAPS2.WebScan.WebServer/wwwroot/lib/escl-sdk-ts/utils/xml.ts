import { XMLParser, XMLBuilder } from 'fast-xml-parser'
var defaultOptions = {
  attributeNamePrefix: "_",
  attrNodeName: "", //default is false
  textNodeName: "#text",
  ignoreAttributes: false,
  cdataTagName: "__cdata", //default is false
  cdataPositionChar: "\\c",
  format: false,
  indentBy: "  ",
  supressEmptyNode: false
};
const json2XMLParser = new XMLParser(defaultOptions)
const json2XMLBuilder = new XMLBuilder(defaultOptions)

// let xml =require( './capabilities.xml')

// const xmlJSON = require('./capabilities.json')

function json2xml(json: object): string {

  return json2XMLBuilder.build(json)
}

function xml2json(xml: string): object {
  return json2XMLParser.parse(xml)
}

module.exports = {
  json2xml: json2xml,
  xml2json: xml2json
}
export {
  json2xml,
  xml2json
}