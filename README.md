# Datatable of HRNET

datatable-hrnet is a react library created using create-react-app. It allows you to display data in a dynamic table that can be filtered and sorted.

## Features 

### Display number of rows per page 
You can chose the number of rows per page you want to display via the "entries select options (10, 25, 50, 100)".
The default display is 10 lines per page.

### Search by criteria
You can search easily an entry via the search input form. 

### Sort by columns
You can also sort by colums value (ASC or DESC) via the icons "up" and "down"

### Pagination
You can easily navigate from one page to another via the pagination tab.

## Requirements
- React 18.2.0

## Installation
- using NPM : `npm install datatable-hrnet `
- using YARN: `yarn add datatable-hrnet`

## Usage
To use this plugin, you need to import it into your React component.
This plugin requires 2 props: columnTitle and datas.
- columnTitle : corresponds to the name of the datatable columns.
- datas : contains the data for the rows.

### Example

MyComponents.jsx

datas.js
