import React from "react";
import "../../../node_modules/react-grid-layout/css/styles.css"
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close';
import { Tile } from "../tile/Tile";
import { ComponentTypes } from "../../enum/enum";

import ReactGridLayout, { WidthProvider, Responsive } from "react-grid-layout";
import _ from 'lodash';
import { Blotter } from "../blotter/Blotter";
import { Chart } from "../chart/Chart"

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface GridLayoutProps { 
    }

interface GridLayoutState {
    items: gridItem[],
    highestCount: number,
    savedLayouts: savedLayout[],
    selectedDropdownOption: number
}

interface notUsingbutforef {
  item: ReactGridLayout // these are the things inside gridItem but not everything cause we dont need everything. why never just use this in the first place? cause its simpler to just use this, there are other things needed, gridItem array is sufficient
}

interface gridItem {
    i: number,
    x: number,
    y: number,
    w: number,
    h: number,
    minW: number,
    maxW: number | undefined,
    minH: number,
    maxH: number | undefined,
    draggable: boolean,
    isResizable: boolean,
    componentType: ComponentTypes 
    // add: boolean
}

interface savedLayout {
    value: number,
    label: string,
    layout: any, //It is the layout object returned from react-grid-layout
    items: gridItem[]
}

export default class GridLayout extends React.Component<GridLayoutProps, GridLayoutState> {

  constructor(props: any) {
    super(props);

    this.state = {
    items: [],
      highestCount: 0,
      savedLayouts: [{value:0, label: "(Empty)", layout: {}, items: []} ]
    ,
      selectedDropdownOption: 0,
    };

    this.onAdd = this.onAdd.bind(this);
  }

  createElement(el: gridItem) {
    const removeStyle: React.CSSProperties = {
      cursor: "pointer",
      color: "white",
      width: "1em",
      height: "100%",
    };

    const i = el.i;

    return (
      <div key={i} data-grid={el} className="gridItemsClass">
        <div style={{display: "flex", flexDirection: "row", height: "1em", width: "100%"}}>
            <span className="drag-handle" style={{height: "1em", width: "100%"}}></span>
            <span className="close" onClick={this.onRemoveItem.bind(this,i)} style={removeStyle}>
                <CloseIcon fontSize="inherit"/>
                {/* use inherit to keep the icon inside the parent */}
            </span>
        </div>
        {el.componentType === ComponentTypes.TILE ? <Tile id={i} /> : el.componentType === ComponentTypes.BLOTTER ? <Blotter /> : <Chart />}
      </div>
    );
  }


  onAdd(componentType: ComponentTypes) {
    const width = componentType === ComponentTypes.TILE ? 2 : 10;
    const height = componentType === ComponentTypes.TILE ? 2 : 3;

    this.setState({
      items: this.state.items.concat({
        i: this.state.highestCount + 1, // Add a new item. It must have a unique key!
        x: (this.state.items.length * 2) % 12,
        y: Infinity, // puts it at the bottom
        w: width,
        h: height,
        draggable: false,
        minW: 2,
        maxW: componentType === ComponentTypes.TILE ? 2 : undefined,
        minH: 2,
        maxH: componentType === ComponentTypes.TILE ? 2 : undefined,
        isResizable: componentType === ComponentTypes.TILE ? false : true,
        componentType: componentType
      }),
      highestCount: this.state.highestCount  + 1,
    });
  }

  onRemoveItem(i: any) {
    this.setState({ items: _.reject(this.state.items, { i: i }) });

  }

  onLayoutChange =(currentLayout: ReactGridLayout.Layout[], allLayouts: ReactGridLayout.Layouts) => {
    // Persisting new changes in layout, updating the state so that tiles dont move around when rerendered. 
    // console.log("on layout change: ", currentLayout)
    const currentState = this.state.items;
    currentState.forEach(state => {
      currentLayout.forEach(layout => {
        if(state.i === parseInt(layout.i)){//layout.i is a string not a number, so have to cast.
          state.h = layout.h;
          state.w = layout.w;
          state.x = layout.x;
          state.y = layout.y;
        }
      })
    })
    this.setState({items: currentState});
  }

  // ---------------------Dropdown related----------------

  handleDropdownCallback = (newValue: any) => {
    const saveLayout = this.getSelectedLayoutWithProps(newValue);
    // console.log("handle dropdown: ","save layout", saveLayout, newValue)
    this.setState({
    //   items: saveLayout.items,
      selectedDropdownOption: newValue
    });
  }

  handleSavedLayoutTextInput = (newValue: any) => {
    const saveLayoutObject = this.state.savedLayouts
    saveLayoutObject.push({
      value: this.state.savedLayouts.length,
      label: newValue,
      layout: Object.assign({}, this.state.items),
      items: this.state.items
    })

    this.setState({
      savedLayouts: saveLayoutObject
    })
    // console.log("saved text layout name: ", this.state.savedLayouts)
  }
  // -------------------------------------------------------

  getSelectedLayout = () => {
    let returnObject = {}
    if(this.state.selectedDropdownOption === 0){
      return returnObject;
    }else{
      this.state.savedLayouts.forEach(layout => {
        if(layout.value == this.state.selectedDropdownOption){
          returnObject = layout.layout;
          return returnObject;
        }
      })
    }
  }

  getSelectedLayoutWithProps = (newValue: any) => {
    // console.log("nothing", this.state, newValue)
    let returnObject = {};

    if(newValue === 0){
      returnObject =  {};
    }else{
      this.state.savedLayouts.forEach(layout => {
        if(layout.value == newValue){
          returnObject = layout;
        }
      })
    }
    return returnObject
  }

  // ------------------------------------------------------

  render() {
    // console.log("render method", this.state)
    return (
      <div>
        <div className="Banner" style={{display: "flex", justifyContent: "space-between", paddingRight: "1em", paddingLeft: "1em", height: "3em", flexWrap: "wrap", alignContent: "center", marginTop: "1em",}}>
          <div className="MenuOptions" >
            <Button onClick={()=>this.onAdd(ComponentTypes.TILE)} variant="contained" style={{marginLeft: "1em"}}>Tile</Button>
            <Button onClick={()=>this.onAdd(ComponentTypes.BLOTTER)} variant="contained" style={{marginLeft: "1em"}}>Blotter</Button>
            <Button onClick={()=>this.onAdd(ComponentTypes.CHART)} variant="contained" style={{marginLeft: "1em"}}>Chart</Button>
          </div>
          <div className="LayoutOptions" style={{display: "flex", height: "3em"}}>
            {/* Place holder for layout saving inputs */}
          </div>
        </div>
        <ResponsiveReactGridLayout
        isDraggable={true}
        draggableHandle=".drag-handle"
          onLayoutChange={this.onLayoutChange}
        //   onBreakpointChange={this.onBreakpointChange}
          layouts={this.getSelectedLayout()}
        >
          {_.map(this.state.items, el => this.createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

/*
currentLayout the object is like this for 2 tiles: 
there are other variables but they are all null for now. 
[
    {
        "w": 2,
        "h": 2,
        "x": 0,
        "y": 0,
        "i": "1",
        "moved": false,
        "static": false
    },
    {
        "w": 4,
        "h": 2,
        "x": 2,
        "y": 0,
        "i": "2",
        "moved": false,
        "static": false
    }
]
*/