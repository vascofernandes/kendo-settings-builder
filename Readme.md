

Kendo UI settings builder for Javascript with fluent API similar to Kendo UI ASP.MVC.

Created using Typescript.


##### *Note: This software is in alpha stage and under development. It is not ready for production use. It may even not work at all.*


Usage: 


```Typescript

class CustomerType {
    Types = {
        [CustomerType.Id]: ModelDescriptorFieldType.Number,
        [CustomerType.Name]: ModelDescriptorFieldType.String,
    };

    static Id = 'id';
    static Name = 'name';
}

let gridOptions = new GridBuilder<ICustomerType>(CustomerType)
    .Columns( columns => {
        columns.Bound( model => model.Id).Title('Customer Id');
        columns.Bound( model => model.Name).Title('Customer Name');
    })
    .DataSource(ds => { ds
        .Ajax()
        .Read((op: CrudOperationBuilder) => op.Action('myurl'));
    })
    .Height(400)
    .Scrollable(sc: => { sc
        .Enabled(true)
        .Height(200)
        .Virtual(true);
    });
    
```

In an editor with Typescript support full typing and code completion is available. 



Contributions and pull requests are welcome.


Install node.js modules:
  ```bash
  
    npm install
  ```

Install DefinitelyTyped Typescript deffinition files:
  ```bash
  
    npm run tsd install
  ```

Build using the Typescript compiler:
  ```bash
  
    npm run tsc
  ```
  
Build distributable packages (using Webpack):
  ```bash
  
    npm run build
  ```

