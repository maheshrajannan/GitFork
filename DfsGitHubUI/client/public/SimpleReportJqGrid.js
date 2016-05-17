    //<![CDATA[
    $(function() {
        "use strict";
        //alert('inside function');
        var $grid = $("#list");
        $grid.jqGrid({
            autoencode: true,
            //url: "http://www.ok-soft-gmbh.com/jqGrid/DynamicHeaderProperties.json",
            //INFO: CORS
            //Solving it the right way.
            //https://www.npmjs.com/package/cors
            //INFO: formatter is only used to format the cells, so custom formatter only formats the cells and not 
            //TODO: Try http://stackoverflow.com/questions/15109249/change-a-value-of-the-columnmodel-jqgrid-after-draw
            url: "https://localhost:3000/api/v1/invoicesMetaData",
            /**
            INFO:http://stackoverflow.com/questions/6184399/add-additional-param-to-post-data-using-jqgrid-when-adding-new-row-with-modal-fo
            Adding security params to the post call
            **/
            postData: {jwtToken:$("#jsonWebTokenId").val()},
            /**
            INFO: Make it as a post so that JSON cannot be called from browser.However this can be called from the curl.
            **/
            mtype: "POST",
            datatype: "json",
            colModel: [
                //{ name: "c1", width: 70, editable: true, formatter:customFormatter}
                {
                    name: "c1",
                    sortable: true,
                    editable: true,
                    hidden: true
                    //,
                    //INFO: http://www.trirand.com/jqgridwiki/doku.php?id=wiki:common_rules#formoptions
                    //formoptions:{label:"Hi"},
                },
                //{ name: "c2",  sortable: true,  align: "center"}
                {
                    name: "c2",
                    sortable: true,
                    hidden: true
                },
                /**
                    //Why not set the column data width as the width of the cell....or something as a percentage of 
                    //database column width as cell width
                    // { name: "c2", width: 80, align: "center", sorttype: "date",
                    // formatter: "date", formatoptions: {newformat: "m/d/Y"}, datefmt: "m/d/Y"}
                **/
                {
                    name: "c3",
                    sortable: true,
                    editrules: {
                        required: true,
                        number: true
                    },
                    editable: true,
                    hidden: true
                }, 
                {
                    name: "c4",
                    sortable: true,
                    editable: true,
                    editrules: {
                        required: true,
                        number: true
                    },
                    hidden: true
                },
                {
                    name: "c5",
                    sortable: true,
                    editrules: {
                        required: true,
                        number: true
                    },
                    editable: true,
                    hidden: true
                }, 
                {
                    name: "c6",
                    sortable: true,
                    editable: true,
                    hidden: true
                }, 
                {
                    name: "c7",
                    sortable: true,
                    editable: true,
                    hidden: true
                }, 
                {
                    name: "c8",
                    sortable: true,
                    editable: true,
                    hidden: true
                }, 
                {
                    name: "c9",
                    sortable: true,
                    editable: true,
                    hidden: true
                }, 
                {
                    name: "c10",
                    sortable: true,
                    editable: true,
                    hidden: true
                }, 
                {
                    name: "c11",
                    sortable: true,
                    editable: true,
                    hidden: true
                }, 
                {
                    name: "c12",
                    sortable: true,
                    editable: true,
                    hidden: true
                }, 
                {
                    name: "c13",
                    sortable: true,
                    editable: true,
                    hidden: true
                }, 
                {
                    name: "c14",
                    sortable: true,
                    editable: true,
                    hidden: true
                }, 
                {
                    name: "c15",
                    sortable: true,
                    editable: true,
                    hidden: true
                }, 
                {
                    name: "c16",
                    sortable: true,
                    editable: true,
                    hidden: true
                }
                /**
                RECTIFIED version
                **/             
            ],
            rowNum: 20,
            rowList: [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            //http://www.trirand.com/jqgridwiki/doku.php?id=wiki:pager
            //Now customize all these.
            pager: "#pager",
            pgtext : "Page {0} of {1} Pages",
            //gridview: true,
            //rownumbers: true,
            //INFO: this works
            //recordtext:"{0}-{1} users of {2} users",
            sortname: "c2",
            viewrecords: true,
            sortorder: "desc",
            caption: "NONE",
            jsonReader: {
                root: "data"
            },
            altRows: true,
            altclass: 'myAltRowClass',            
            beforeRequest: function() {
                //alert("Hi beforeRequest");                
            },
            beforeProcessing: function(data) {
                /**
                                    TODO: adding edit options made it fail.
                                    TODO: why is this not loading in firefox ?
                                    { name: "c7", width: 110, align: "center", formatter: "select", editable: true,
                    edittype: "select", editoptions: {value: "FE:FedEx;TN:TNT;IN:Intim", defaultValue: "Intime"}}
                **/
                //INFO: before processing is a function provided by jqgrid.It
                //is like a hook, before jqgrid processes data.
                //The action to take on an event , is set as a property on the grid.
                //We can simply change this..Note, functions are set as property..
                //http://www.trirand.com/jqgridwiki/doku.php?id=wiki:events
                //alert('inside beforeProcessing');
                //This where the columns are getting set.
                //TODO change this as column key and label
                //http://stackoverflow.com/questions/13160522/check-if-an-array-contains-an-object-with-a-certain-property-value-in-javascript
                /**
        "model": {
        {"key":"c1", "label": "Client" },
        {"key":"c2", "label": "Date" },
        {"key":"c3", "label": "Amount" },
        {"key":"c4", "label": "Tax" },
        {"key":"c5", "label": "Total" },
        {"key":"c6", "label": "Paid" },
        {"key":"c7", "label": "Shipped via" },
        {"key":"c8", "label": "Notes" }
        }
                **/
                /**
{
    "model": {
        "c1": { "label": "Client" },
        "c2": { "label": "Date" },
        "c3": { "label": "Amount" },
        "c4": { "label": "Tax" },
        "c5": { "label": "Total" },
        "c6": { "label": "Paid" },
        "c7": { "label": "Shipped via" },
        "c8": { "label": "Notes" }
    },
    "data": [
        {"id": "10",  "cell": ["test",   "2007-10-01", "200.00", "10.00", "210.00", "true",  "TN", "note"  ] },
        {"id": "20",  "cell": ["test2",  "2007-10-02", "300.00", "20.00", "320.00", "false", "FE", "note2" ] },
        {"id": "30",  "cell": ["test3",  "2007-09-01", "400.00", "30.00", "430.00", "false", "FE", "note3" ] },
        {"id": "40",  "cell": ["test4",  "2007-10-04", "200.00", "10.00", "210.00", "true",  "TN", "note4" ] },
        {"id": "50",  "cell": ["test5",  "2007-10-31", "300.00", "20.00", "320.00", "false", "FE", "note5" ] },
        {"id": "60",  "cell": ["test6",  "2007-09-06", "400.00", "30.00", "430.00", "false", "FE", "note6" ] },
        {"id": "70",  "cell": ["test7",  "2007-10-04", "200.00", "10.00", "210.00", "true",  "TN", "note7" ] },
        {"id": "80",  "cell": ["test8",  "2007-10-03", "300.00", "20.00", "320.00", "false", "FE", "note8" ] },
        {"id": "90",  "cell": ["test9",  "2007-09-01", "400.00", "30.00", "430.00", "false", "TN", "note9" ] },
        {"id": "100", "cell": ["test10", "2007-09-08", "500.00", "30.00", "530.00", "true",  "TN", "note10"] },
        {"id": "110", "cell": ["test11", "2007-09-08", "500.00", "30.00", "530.00", "false", "FE", "note11"] },
        {"id": "120", "cell": ["test12", "2007-09-10", "500.00", "30.00", "530.00", "false", "FE", "note12"] }
    ]
}**/
                var $self = $(this),
                    model = data.model,
                    name, $colHeader, $sortingIcons;
                //INFO: you can get the colModel like the below but it is not necessary
                //var colModel = $(this).$grid;
                //TODO: http://www.trirand.com/jqgridwiki/doku.php?id=wiki%3amethods

                //alert('self' + JSON.stringify($this) +'End');
                //alert('this-objectInspector' + simpleObjInspect($(this)) +'End');
                //alert('this-colModel' + simpleObjInspect($(colModel)) +'End');
                //alert('this-colModel-methods' + Inspect.methods($(colModel)) +'End');
                //alert('this-colModel-properties' + Inspect.methods($(colModel)) +'End');
                //alert('this' + JSON.stringify($(this),null,4) +'End');
                //alert('model-' + JSON.stringify(model,null,4) +'-End');
                //alert('data-' + JSON.stringify(data.data,null,4) +'-End');
                //alert('colHeader-' + JSON.stringify($colHeader,null,4) +'-End');
                //alert('sortingIcons-' + JSON.stringify($sortingIcons,null,4) +'-End');
                if (model) {

                    //INFO:http://www.trirand.com/jqgridwiki/doku.php?id=wiki:pager
                    //INFO:http://stackoverflow.com/questions/15659109/jquery-jqgrid-recordtext-customization
                    //Changed "$("#grid").jqGrid('setGridParam', { recordtext: "View {0} - {1}" + " of " + Total}).trigger('reloadGrid');" this code.
                    //INFO: this is done on before processing so that reload need not be triggered.
                    $("#list").jqGrid('setGridParam', { recordtext: 'View {0} - {1} '+ data.report.element.labelPlural +' of {2}'});

                    //name is c1,c2,c3,c4,c5,c6,c7,c8 from the received json object model.
                    //INFO: found it is a received json object because up on commenting one of the columns this still
                    //shows 8.
                    for (name in model) {
                        //alert('name' + name);
                        //alert('model' + model);
                        if (model.hasOwnProperty(name)) {
                            $("#list").jqGrid("showCol", name);
                            //INFO: basically if the model json object has a property for c1 or c2.
                            $colHeader = $("#jqgh_" + $.jgrid.jqID(this.id + "_" + name));
                            //INFO: $.jgrid.jqID(this.id + "_" + name) evaluates to list_c1
                            //alert('$.jgrid.jqID(this.id + "_" + name)=' + $.jgrid.jqID(this.id + "_" + name));
                            $sortingIcons = $colHeader.find(">span.s-ico");
                            //alert('sortingIcons' + JSON.stringify($sortingIcons));
                            //INFO: This sets the label from the model json as text on the column header.
                            //text is a (inherited) method on the colHeader object (inherited from js object) and it is what get displayed
                            $colHeader.text(model[name].label);
                            //alert('colHeader' + JSON.stringify($colHeader));
                            //alert('colHeader' + simpleObjInspect($colHeader) +'End');
                            //alert('colHeader-Methods-' + Inspect.methods($colHeader) +'-End')
                            //alert('colHeader-Attr' + Inspect.properties($colHeader) +'End')
                            $colHeader.append($sortingIcons);
                            //TODO: try this at some point.
                            //http://www.trirand.com/blog/?page_id=393/help/dynamically-add-columns-to-the-jqgrid
                            //$grid('setLabel', 'id', 'invoice_id');
                            //alert('this-$grid' + Inspect.methods($grid) +'End');
                            //alert('this-$grid' + Inspect.properties($grid) +'End');
                            //$("#list").jqGrid('setLabel', "id","aa"); //colModel name value
                            //
                            //alert('changing');
                            //INFO: this one works because the column label is still seen as c1
                            //$("#list").jqGrid('setLabel', "c1","aa"); //colModel name value
                            //jQuery('#list').jqGrid('clearGridData');
                            //jQuery('#list').jqGrid('setGridParam', {colModel: ''});
                            var cols = jQuery("#list").jqGrid('getGridParam', 'colModel');
                            //jQuery('#list').trigger('reloadGrid');
                            //alert('this-$grid-methods' + Inspect.methods(cols) +'End');
                            //alert('this-$grid-props' + Inspect.properties(cols) +'End');
                            //INFO: Hurray this is working...
                            //http://stackoverflow.com/questions/15109249/change-a-value-of-the-columnmodel-jqgrid-after-draw
                            //http://www.trirand.com/jqgridwiki/doku.php?id=wiki%3amethods#add_on_grid_methods
                            //$("#list").jqGrid("setColProp", "c2", {formatter:"date"});
                            //$("#list").jqGrid("setColProp", "c2", {datefmt:"m/d/Y"});
                            //alert(name + 'name has type' + model[name].type.toLowerCase());

                            $("#list").jqGrid("setColProp", name, {
                                formatter: model[name].formatter
                            });
                            //TODO: the default type conversion from postgres to js is not elegant enough   
                            //TODO getFormatterType(type) that takes input as type and outputs a sensible default.
                            $("#list").jqGrid("setColProp", name, {
                                align: model[name].alignment
                            });
                    //,
                    //INFO: http://www.trirand.com/jqgridwiki/doku.php?id=wiki:common_rules#formoptions
                    //formoptions:{label:"Hi"},
                            $("#list").jqGrid("setColProp", name, {
                                formoptions: {label:model[name].label}
                            });                            
                            //TODO: the default type conversion from postgres to js is not elegant enough   
                            //TODO getFormatterType(type) that takes input as type and outputs a sensible default.
                            if (model[name].type.toLowerCase() == 'date') {
                                //alert('setting date format');
                                //{ name: "c2", width: 80, align: "center", sorttype: "date",
                                //formatter: "date", formatoptions: {newformat: "m/d/Y"}, datefmt: "m/d/Y"}
                                //
                                //formatoptions: {newformat: "m/d/Y"}
                                //srcformat: "ISO8601Long"
                                $("#list").jqGrid("setColProp", name, {
                                    formatoptions: {
                                        srcformat: "ISO8601Long",
                                        newformat: "m/d/Y h:i A"
                                    }
                                });
                                //formatoptions: { srcformat: "ISO8601Long", newformat: "m/d/Y h:i A" },
                                //$("#list").jqGrid("setColProp", name, {datefmt:"m/d/Y h:i A"});
                            }
                        }
                    }
                }
                //alert('column text is now set');
                //$("#list").jqGrid('setLabel', "client","aa"); //colModel name value
                //alert('changing');INFO: this one works because the column label is still seen as c1
                //$("#list").jqGrid('setLabel', "c1","aa"); //colModel name value

            },
            //
            loadComplete: function(data) {
                var width = Math.round($(window).width() * 0.90, true);
                //var width = Math.round($(window).width()-60, true);
                //http://stackoverflow.com/questions/10561452/is-it-possible-to-set-width-of-a-jqgrid-in-percentage
                // Refer As for me consider this to be best decision.
                //INFO:http://stackoverflow.com/questions/15437218/jqgrid-what-the-difference-between-loadcomplete-and-gridcomplete-events
                //alert('setting width to '+width);
                //alert(data);
                $("#list").jqGrid("setGridWidth", width);
                $("#list").jqGrid("setCaption", data.report.element.labelPlural);
                //Not working below line
                //$("#list").jqGrid('setGridParam', { recordtext: 'View {0} - {1} ' + data.report.element.labelPlural + ' of {2} ' + data.report.element.labelPlural});
                //INFO: setting navgrid on load complete , so that they can be dynamically received from server.
        /*INFO: Guideline importance of formatting.
            Navigator was not working made it work ..after formatting my code with js beautifier and 
            then following correct syntax at the right place. js formatting helped me find the right place
            Solution from 
            http://stackoverflow.com/questions/20267596/jqgrid-pagination-not-working-properly
            */
            $("#list").jqGrid(
                'navGrid','#pager',
                //http://www.trirand.com/jqgridwiki/doku.php?id=wiki:navigator
                {view:true,add:false, del:false,edit:false,search:false,
                    viewtitle: data.report.navigation.viewTitle,
                    refreshtitle: data.report.navigation.refreshTitle
                },
                {}, // use default settings for edit
                {}, // use default settings for add
                {},  // delete instead that del:false we need this
                {multipleSearch : false}, // enable the advanced searching
                /* allow the view dialog to be closed when user press ESC key*/            
                {closeOnEscape:true,caption: data.report.viewOptions.caption, bClose: data.report.viewOptions.buttonClose} 
                );
                $("#pager_left").css("width", "");
            //INFO:http://www.trirand.com/jqgridwiki/doku.php?id=wiki:pager
            //INFO:http://stackoverflow.com/questions/15659109/jquery-jqgrid-recordtext-customization
            //Changed "$("#grid").jqGrid('setGridParam', { recordtext: "View {0} - {1}" + " of " + Total}).trigger('reloadGrid');" this code.
            //    $("#list").jqGrid('setGridParam', { recordtext: 'View {0} - {1} App users of {2}'}).trigger('reloadGrid');

            },
                //INFO: forgetting parameters you added will drive you crazy.
                loadonce: false,
                height: "auto"
            });
        /*INFO: Guideline importance of formatting.
            Navigator was not working made it work ..after formatting my code with js beautifier and 
            then following correct syntax at the right place. js formatting helped me find the right place
            Solution from 
            http://stackoverflow.com/questions/20267596/jqgrid-pagination-not-working-properly
            */
            /*
        $("#list").jqGrid(
            'navGrid','#pager',
            //http://www.trirand.com/jqgridwiki/doku.php?id=wiki:navigator
            {view:true,add:false, del:false,edit:false,search:false,viewtitle: 'Click To View User',refreshtitle: 'Refresh Users'},
            {}, // use default settings for edit
            {}, // use default settings for add
            {},  // delete instead that del:false we need this
            {multipleSearch : false}, // enable the advanced searching
            {closeOnEscape:true,caption: 'View User', bClose: 'Close User'} 
            );*/
        //INFO:http://stackoverflow.com/questions/26449583/jqgrid-pager-alignment
            //alert('pager');
            //$("#pager_left").css("width", "");
    
    });
    //]]>

    function customFormatter(cellvalue, options, rowObject) {
        return "<a href='/Controller/Action/" + options.rowId + "' >Click here</a>";
    }
    //INFO:
    //http://stackoverflow.com/questions/875225/resize-jqgrid-when-browser-is-resized
    //When the window size changes resize the gird
    $(window).bind('resize', function() {
        //alert('Ensure not getting called on sort');
        var width = Math.round($(window).width() * 0.90, true);
        //var width = Math.round($(window).width()-60, true);
        $("#list").jqGrid("setGridWidth", width);
    });    