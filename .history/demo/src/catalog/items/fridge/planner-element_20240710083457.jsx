import * as Three from "three";
import React from "react";
import { Button } from "@mui/material";

const RADIUS = 20;
const HEIGHT = 40;

export default {
  name: "onetable",
  prototype: "items",

  info: {
    tag: ["furnishings"],
    title: "",
    description: "onetable",
    image: require("./oneTable.png"),
  },

  properties: {
    width: {
      label: "width",
      type: "length-measure",
      defaultValue: {
        length: 250,
        unit: "cm",
      },
    },
    depth: {
      label: "depth",
      type: "length-measure",
      defaultValue: {
        length: 100,
        unit: "cm",
      },
    },
    height: {
      label: "height",
      type: "length-measure",
      defaultValue: {
        length: 80,
        unit: "cm",
      },
    },
    altitude: {
      label: "altitude",
      type: "length-measure",
      defaultValue: {
        length: 0,
        unit: "cm",
      },
    },
  },
  render2D: function (element, layer, scene) {
    let angle = element.rotation + 90;
    // const WIDTH = 150;
    // const DEPTH = 160;
    const HEIGHT = 50;
    let textRotation = 0;
    if (Math.sin((angle * Math.PI) / 180) < 0) {
      textRotation = 180;
    }
    let WIDTH = element.properties.get("width").get("length");
    let DEPTH = element.properties.get("depth").get("length");

    return (
      <g
        transform={`translate(${-WIDTH / 2},${-DEPTH / 2})`}
        // onClick={() => alert(`hoiiiiiiii ${element.id}`)}
      >
        <rect
          key="1"
          x="-20"
          y="-20"
          width={WIDTH + 40}
          height={DEPTH + 40}
          style={{
            stroke: element.selected ? "#0096fd" : "transparent",
            strokeWidth: "2px",
            fill: "transparent",
          }}
        />
        <svg
          id="Layer_2"
          data-name="Layer 2"
          xmlns="http://www.w3.org/2000/svg"
          fill="#964B00"
        >
          <g id="Furniture">
            <rect className="cls-1" width={WIDTH} height={DEPTH} />
          </g>
        </svg>
      </g>
    );
  },

  render3D: function (element, layer, scene) {
    let newAltitude = element.properties.get("altitude").get("length");

    var grey = new Three.MeshLambertMaterial({ color: 0xdddddd });
    grey.side = Three.DoubleSide;

    var cestino = new Three.Object3D();

    var cylinderGeometry1 = new Three.CylinderGeometry(0.25, 0.25, 0.0001, 80);
    var p1 = new Three.Mesh(cylinderGeometry1, grey);
    cestino.add(p1);

    var cylinderGeometry2 = new Three.CylinderGeometry(
      0.3,
      0.25,
      0.002,
      80,
      80,
      true
    );
    var p2 = new Three.Mesh(cylinderGeometry2, grey);
    p2.position.set(0, 0.001, 0);
    p1.add(p2);

    let value = new Three.Box3().setFromObject(cestino);

    let deltaX = Math.abs(value.max.x - value.min.x);
    let deltaY = Math.abs(value.max.y - value.min.y);
    let deltaZ = Math.abs(value.max.z - value.min.z);

    if (element.selected) {
      let bbox = new Three.BoxHelper(cestino, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 100;
      bbox.material.depthTest = false;
      cestino.add(bbox);
    }

    cestino.position.y += HEIGHT / 16 + newAltitude;
    cestino.scale.set(
      (1.5 * RADIUS) / deltaX,
      HEIGHT / deltaY,
      (1.5 * RADIUS) / deltaZ
    );

    return Promise.resolve(cestino);
  },
};
