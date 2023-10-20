import React from "react";

// import "./DwvComponent.css";
import { App, getDwvVersion, decoderScripts } from "dwv";
import Button from "./Button";

// Image decoders (for web workers)
decoderScripts.jpeg2000 = `${process.env.PUBLIC_URL}/assets/dwv/decoders/pdfjs/decode-jpeg2000.js`;
decoderScripts[
  "jpeg-lossless"
] = `${process.env.PUBLIC_URL}/assets/dwv/decoders/rii-mango/decode-jpegloss.js`;
decoderScripts[
  "jpeg-baseline"
] = `${process.env.PUBLIC_URL}/assets/dwv/decoders/pdfjs/decode-jpegbaseline.js`;
decoderScripts.rle = `${process.env.PUBLIC_URL}/assets/dwv/decoders/dwv/decode-rle.js`;

class DwvImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      versions: {
        dwv: getDwvVersion(),
        react: React.version,
      },
      tools: {
        Scroll: {},
        ZoomAndPan: {},
        WindowLevel: {},
        Draw: {
          options: ["Ruler"],
        },
      },
      selectedTool: "Select Tool",
      loadProgress: 0,
      dataLoaded: false,
      dwvApp: null,
      metaData: {},
      orientation: undefined,
      showDicomTags: false,
      dropboxDivId: "dropBox",
      dropboxClassName: "dropBox",
      borderClassName: "dropBoxBorder",
      hoverClassName: "hover",
    };
  }

  render() {
    const { versions, tools, loadProgress, dataLoaded, metaData } = this.state;

    const handleToolChange = (event, newTool) => {
      if (newTool) {
        this.onChangeTool(newTool);
      }
    };
    const toolsButtons = Object.keys(tools).map((tool) => {
      return (
        <Button
          // value={tool}
          key={tool}
          btnText={tool}
          disable={!dataLoaded || this.canRunTool(tool)}
        />
      );
    });

    return (
      <div id="dwv">
        <div id="layerGroup0" className="layerGroup">
          <div id="dropBox" className="w-full">
            {/* <img
              src={this.props.image}
              alt="test"
              className="w-full object-cover h-[180px]"
            /> */}
            <div>{toolsButtons}</div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // create app
    const app = new App();
    // initialise app
    app.init({
      dataViewConfigs: { "*": [{ divId: "layerGroup0" }] },
      tools: this.state.tools,
    });

    // load events
    let nLoadItem = null;
    let nReceivedLoadError = null;
    let nReceivedLoadAbort = null;
    let isFirstRender = null;

    app.addEventListener("loadstart", (/*event*/) => {
      // reset flags
      nLoadItem = 0;
      nReceivedLoadError = 0;
      nReceivedLoadAbort = 0;
      isFirstRender = true;
      // hide drop box
      this.showDropbox(app, false);
    });

    app.addEventListener("loadprogress", (event) => {
      this.setState({ loadProgress: event.loaded });
    });

    app.addEventListener("renderend", (/*event*/) => {
      if (isFirstRender) {
        isFirstRender = false;
        // available tools
        let selectedTool = "ZoomAndPan";
        if (app.canScroll()) {
          selectedTool = "Scroll";
        }
        this.onChangeTool(selectedTool);
      }
    });
    app.addEventListener("load", (/*event*/) => {
      // set dicom tags
      this.setState({ metaData: app.getMetaData(0) });
      // set data loaded flag
      this.setState({ dataLoaded: true });
    });
    app.addEventListener("loadend", (/*event*/) => {
      if (nReceivedLoadError) {
        this.setState({ loadProgress: 0 });
        alert("Received errors during load. Check log for details.");
        // show drop box if nothing has been loaded
        if (!nLoadItem) {
          this.showDropbox(app, true);
        }
      }
      if (nReceivedLoadAbort) {
        this.setState({ loadProgress: 0 });
        alert("Load was aborted.");
        this.showDropbox(app, true);
      }
    });
    app.addEventListener("loaditem", (/*event*/) => {
      ++nLoadItem;
    });
    app.addEventListener("loaderror", (event) => {
      console.error(event.error);
      ++nReceivedLoadError;
    });
    app.addEventListener("loadabort", (/*event*/) => {
      ++nReceivedLoadAbort;
    });

    // handle key events
    app.addEventListener("keydown", (event) => {
      app.defaultOnKeydown(event);
    });
    // handle window resize
    window.addEventListener("resize", app.onResize);

    // store
    this.setState({ dwvApp: app });

    // setup drop box
    this.setupDropbox(app);

    // possible load from location
    app.loadFromUri(window.location.href);
  }

  /**
   * Get the icon of a tool.
   *
   * @param {string} tool The tool name.
   * @returns {Icon} The associated icon.
   */
  getToolIcon = (tool) => {
    let res;
    if (tool === "Scroll") {
      res = <h1>Menu Icon</h1>;
    } else if (tool === "ZoomAndPan") {
      res = <h1>SearchIcon</h1>;
    } else if (tool === "WindowLevel") {
      res = <h1>Icon</h1>;
    } else if (tool === "Draw") {
      res = <h1>Testing</h1>;
    }
    return res;
  };

  /**
   * Handle a change tool event.
   * @param {string} tool The new tool name.
   */
  onChangeTool = (tool) => {
    if (this.state.dwvApp) {
      this.setState({ selectedTool: tool });
      this.state.dwvApp.setTool(tool);
      if (tool === "Draw") {
        this.onChangeShape(this.state.tools.Draw.options[0]);
      }
    }
  };

  /**
   * Check if a tool can be run.
   *
   * @param {string} tool The tool name.
   * @returns {boolean} True if the tool can be run.
   */
  canRunTool = (tool) => {
    let res;
    if (tool === "Scroll") {
      res = this.state.dwvApp.canScroll();
    } else if (tool === "WindowLevel") {
      res = this.state.dwvApp.canWindowLevel();
    } else {
      res = true;
    }
    return res;
  };

  /**
   * Toogle the viewer orientation.
   */
  toggleOrientation = () => {
    if (typeof this.state.orientation !== "undefined") {
      if (this.state.orientation === "axial") {
        this.state.orientation = "coronal";
      } else if (this.state.orientation === "coronal") {
        this.state.orientation = "sagittal";
      } else if (this.state.orientation === "sagittal") {
        this.state.orientation = "axial";
      }
    } else {
      // default is most probably axial
      this.state.orientation = "coronal";
    }
    // update data view config
    const config = {
      "*": [
        {
          divId: "layerGroup0",
          orientation: this.state.orientation,
        },
      ],
    };
    this.state.dwvApp.setDataViewConfigs(config);
    // render data
    for (let i = 0; i < this.state.dwvApp.getNumberOfLoadedData(); ++i) {
      this.state.dwvApp.render(i);
    }
  };

  /**
   * Handle a change draw shape event.
   * @param {string} shape The new shape name.
   */
  onChangeShape = (shape) => {
    if (this.state.dwvApp) {
      this.state.dwvApp.setToolFeatures({ shapeName: shape });
    }
  };

  /**
   * Handle a reset event.
   */
  onReset = () => {
    if (this.state.dwvApp) {
      this.state.dwvApp.resetDisplay();
    }
  };

  /**
   * Open the DICOM tags dialog.
   */
  handleTagsDialogOpen = () => {
    this.setState({ showDicomTags: true });
  };

  /**
   * Close the DICOM tags dialog.
   */
  handleTagsDialogClose = () => {
    this.setState({ showDicomTags: false });
  };

  // drag and drop [begin] -----------------------------------------------------

  /**
   * Setup the data load drop box: add event listeners and set initial size.
   */
  setupDropbox = (app) => {
    this.showDropbox(app, true);
  };

  /**
   * Default drag event handling.
   * @param {DragEvent} event The event to handle.
   */
  defaultHandleDragEvent = (event) => {
    // prevent default handling
    event.stopPropagation();
    event.preventDefault();
  };

  /**
   * Handle a drag over.
   * @param {DragEvent} event The event to handle.
   */
  onBoxDragOver = (event) => {
    this.defaultHandleDragEvent(event);
    // update box border
    const box = document.getElementById(this.state.dropboxDivId);
    if (box && box.className.indexOf(this.state.hoverClassName) === -1) {
      box.className += " " + this.state.hoverClassName;
    }
  };

  /**
   * Handle a drag leave.
   * @param {DragEvent} event The event to handle.
   */
  onBoxDragLeave = (event) => {
    this.defaultHandleDragEvent(event);
    // update box class
    const box = document.getElementById(this.state.dropboxDivId);
    if (box && box.className.indexOf(this.state.hoverClassName) !== -1) {
      box.className = box.className.replace(
        " " + this.state.hoverClassName,
        ""
      );
    }
  };

  /**
   * Handle a drop event.
   * @param {DragEvent} event The event to handle.
   */
  onDrop = (event) => {
    this.defaultHandleDragEvent(event);
    // load files
    this.state.dwvApp.loadFiles(event.dataTransfer.files);
  };

  /**
   * Handle a an input[type:file] change event.
   * @param event The event to handle.
   */
  onInputFile = (event) => {
    if (event.target && event.target.files) {
      this.state.dwvApp.loadFiles(event.target.files);
    }
  };

  /**
   * Show/hide the data load drop box.
   * @param show True to show the drop box.
   */
  showDropbox = (app, show) => {
    const box = document.getElementById(this.state.dropboxDivId);
    if (!box) {
      return;
    }
    const layerDiv = document.getElementById("layerGroup0");

    if (show) {
      <div id="layerGroup0" className="layerGroup">
        <div id="dropBox">
          {/* <img src={this.props.img} alt="img" /> */}
          {/* <div>{toolsButtons}</div> */}
        </div>
      </div>;
    }
  };

  // drag and drop [end] -------------------------------------------------------
} // DwvImage

export default DwvImage;
