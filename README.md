---
Title: React With RTK
Author: Sadanand Gadwal
Date: 19/09/2023
---

## Project Name - ReactwithRTK

## Version Control

- node 24^
- react 19^

## any packages is required confirm me

    - material ui
    - react-router 
    - rtk  - redux saga with async thunk
    - axios
    - ...?

## DDD Architecture
## option 2
src/
│
├── app/ ← global app setup (Redux store, routes, config)
│ ├── store.js
│ ├── rootReducer.js
│ ├── routes/
│ │ └── AppRoutes.jsx
│ └── config/
│ └── constants.js
│
├── components/ ← Global reusable UI components
│ ├── Modal/
│ ├── TanStackTable/
│ ├── ProgressBar/
│ ├── Alert/
│ ├── TextBox/
│ ├── AutoComplete/
│ ├── StyledTextArea/
│ └── SelectAllMultiSelect/
│
├── Pages/ ← All modules (Sales, Marketing, etc.)
│ ├── Sales/
│ │ ├── Booking/
│ │ ├── index.jsx
│ │ ├── add.jsx
│ │ ├── edit.jsx
│ │ └── review.jsx
│ │
│ └── Marketing/
│ ├── moduleName/
│ ├── index.jsx
│ ├── add.jsx
│ ├── edit.jsx
│ └── review.jsx
│
├── hooks/ ← Reusable hooks only
│ ├── useDebounce.js
│ ├── usePrevious.js
│ ├── useFormPersist.js
│ └── useTableResize.js
│
├── utils/ ← Generic helper utilities
│ ├── ApiService.js
│ ├── DateFormat.js
│ ├── RupeesFormat.js
│ ├── utility.js ← numberToWords, hourFormat, uppercase↔lowercase
│ └── storage.js
│
├── redux/
│ ├── sales/
│ │ ├── action.js  
│ │ ├── reducer.js
│ │ ├── types.js
│ │ └── index.js
│ │
│ ├── booking/
│ ├── marketing/
│ └── moduleName/
│
├── assets/
│ ├── fonts/
│ ├── icons/
│ └── images/
│
├── styles/
│ └── global.scss
│
├── App.jsx
└── main.jsx / index.js

## Rules To Follow !Important - CODE STYLE GUIDELINES

### 1. Use arrow functions everywhere

const handleChange = () => {};

### 2. Use named exports for large modules

export const SalesIndex = () => {};

### 3. Use default exports for components

export default Modal;

## 4. Adding Comments

demo-app // lowercase with hyphens

## 5. creating function Name

functionName // Use camelCase for function names.

## **src/app/**

## option 1 

src/
└── app/
├── store.js
├── rootReducer.js
├── routes/
│ └── AppRoutes.jsx
└── config/
└── constants.js

# **src/components/**

components/
├── Modal/
│ ├── Modal.js
│ └── style.scss
├── TanStackTable/
│ ├── Table.js
│ └── config.js
├── ProgressBar/
│ └── ProgressBar.js
├── Alert/
│ └── Alert.js
├── TextBox/
│ └── TextBox.js
├── AutoComplete/
│ └── AutoComplete.js
├── StyledTextArea/
│ └── StyledTextArea.js
└── SelectAllMultiSelect/
└── SelectAllMultiSelect.js

# **src/Pages/** (Feature Modules)

Pages/
└── Sales/
├── Booking/
├── index.jsx
├── add.jsx
├── edit.jsx
└── review.jsx

# **src/hooks/**

hooks/
├── useDebounce.js
├── usePrevious.js
├── useFormPersist.js
└── useTableResize.js

# **src/utils/**

utils/
├── ApiService.js
├── DateFormat.js
├── RupeesFormat.js
├── utility.js
└── storage.js

# **src/Redux/**

Redux/
├── sales/
│ ├── action.js
│ ├── reducer.js
│ ├── types.js
│ └── index.js
├── booking/
└── marketing/

# **2. NAMING CONVENTIONS FOR PROJECTS**

# ✅ **FILE NAMING RULES**

### **Components**

PascalCase → TextBox.jsx, Modal.jsx, ProgressBar.jsx

### **Hooks**

camelCase starting with `use` → useDebounce.js

### **Pages**

camelCase → add.jsx, edit.jsx, review.jsx

### **Redux**

types.js, action.js, reducer.js, index.js

### **Styles**

componentName.scss → Modal/style.scss

### Utility functions

//example name
formatDate()
numberToWords()
convertTo12Hour()

### MUI Breakpoint

xs - phones
sm - tablets
md - laptop
lg - desktop

<!-- Example Endpoints  -->

## Create Construction Link Payment

https://knsonline.in/test/RestAPI_V1/crm/v2/createConstructionLinkPayment
{"userID":"171903551052335600","milestoneName":"corei5","percentage":10,"displayOrder":1,"description":"intel brand"}
https://knsonline.in/test/RestAPI_V1/crm/v2/getConstructionLinkPayment
{"userID":"171903551052335600","milestoneName":"","status":"Active","generalSearch":"","sortOrder":"","iDisplayStart":0,"iDisplayLength":10}
https://knsonline.in/test/RestAPI_V1/crm/v2/updateConstructionLinkPayment
{"userID":"171903551052335600","clpID":"16","milestoneName":"corei5","percentage":"10","displayOrder":"1","description":"intel brand 123","status":"Active"}











//// mew Mater////////


///////



[Appraisal Question](http://192.168.0.201/test/#/hr-master/appraisal-question)

## id - sadanand.dev@knsgroup.in

## ps - 123456

## Create - http://192.168.0.201/dev/RestAPI_V1/v2/createAppraisalQuestion

payload - {"userID":"171464700312440400","displayOrder":"012","questionTitle":"12","description":"12","categoryID":"2"} - (categoryID mui autoComplete)

dependency api for create

1. Category - http://192.168.0.201/dev/RestAPI_V1/v2/getAppraisalCategory
   payload - {"userID":"171464700312440400","status":"Active","generalSearch":"","sortOrder":"","iDisplayStart":0,"iDisplayLength":"-1"}

## Add Designation

## Update - http://192.168.0.201/dev/RestAPI_V1/v2/updateAppraisalQuestionDesignation

    payload - {"userID":"171464700312440400","appraisalQuestionID":"120","designationID":[{"designationID":"1","isSelected":"1"},{"designationID":"59","isSelected":"1"},{"designationID":"60","isSelected":"0"},{"designationID":"61","isSelected":"0"},{"designationID":"62","isSelected":"0"},{"designationID":"63","isSelected":"0"},{"designationID":"64","isSelected":"0"},{"designationID":"65","isSelected":"0"},{"designationID":"66","isSelected":"0"},{"designationID":"208","isSelected":"0"},{"designationID":"238","isSelected":"0"},{"designationID":"246","isSelected":"0"},{"designationID":"269","isSelected":"0"}]}

Dependency API for Add Designation

1. Department - http://192.168.0.201/dev/RestAPI_V1/v2/getDepartmentMaster - payload - {"userID":"171464700312440400","status":"1","generalSearch":"","sortOrder":"","iDisplayStart":0,"iDisplayLength":"-1"}
2. Table Data - http://192.168.0.201/dev/RestAPI_V1/v2/getHrAppraisalQuestionDesignationForUpdate - payload - {"userID":"171464700312440400","appraisalQuestionID":"120","departmentID":"9"} - (use mui Checkbox)
3. Designation History - http://192.168.0.201/dev/RestAPI_V1/v2/getHrAppraisalQuestionDesignation - {"userID":"171464700312440400","appraisalQuestionID":"120"}

## Add Option

## Create - http://192.168.0.201/dev/RestAPI_V1/v2/createAppraisalQuestionOption -

    payload - {"userID":"171464700312440400","displayOrder":"","appraisalQuestionID":"120","rateID":"5","description":"<p>1212</p>"}

1. Rate - http://192.168.0.201/dev/RestAPI_V1/v2/getAppraisalRating - {"userID":"171464700312440400","status":"Active","sortOrder":"","generalSearch":"","iDisplayStart":0,"iDisplayLength":-1}
2. For Description use Rich text editor - (npm package "react-rte")
3. Option Histroy - http://192.168.0.201/dev/RestAPI_V1/v2/getHrAppraisalQuestionOption - payload - {"userID":"171464700312440400","appraisalQuestionID":"120"}

## Update - http://192.168.0.201/dev/RestAPI_V1/v2/updateAppraisalQuestion

    payload - {"userID":"171464700312440400","appraisalID":"120","questionTitle":"12","description":"12","displayOrder":"12","status":"Active","categoryID":"2"}

Dependency API for update

1. Category - http://192.168.0.201/dev/RestAPI_V1/v2/getAppraisalCategory
   payload - {"userID":"171464700312440400","status":"Active","generalSearch":"","sortOrder":"","iDisplayStart":0,"iDisplayLength":"-1"}

## List Main Table - http://192.168.0.201/dev/RestAPI_V1/v2/getAppraisalQuestion

    payload - {"userID":"169548080048036100","status":"Active","generalSearch":"","sortOrder":"","iDisplayStart":0,"iDisplayLength":10,"processID":"","authorityID":"","departmentID":"","designationID":"","categoryID":""}

## Filters

1. Depatement - http://192.168.0.201/dev/RestAPI_V1/v2/getAppraisalQuestionDepartmentFilter - {"userID":"169548080048036100","categoryID":"","departmentID":"","designationID":"","status":"Active"}
2. Desgination - http://192.168.0.201/dev/RestAPI_V1/v2/getAppraisalQuestionDesignationFilter - {"userID":"169548080048036100","categoryID":"","departmentID":"","designationID":"","status":"Active"}
3. Category - http://192.168.0.201/dev/RestAPI_V1/v2/getAppraisalQuestionCategoryFilter - {"userID":"169548080048036100","categoryID":"","departmentID":"","designationID":"","status":"Active"}
4. Status - options={[
   {
   id: "Active",
   name: "Active",
   },
   {
   id: "InActive",
   name: "InActive",
   },
   ]}
