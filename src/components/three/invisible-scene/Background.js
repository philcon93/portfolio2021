import * as THREE from "three";
import { useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import PropTypes from "prop-types";

const calcCoveredTextureScale = (texture, aspect, target) => {
  const result = target ?? new THREE.Vector2();
  const imageAspect = texture.image.width / texture.image.height;

  if (aspect < imageAspect) {
    result.set(aspect / imageAspect, 1);
  } else {
    result.set(1, imageAspect / aspect);
  }

  return result;
};

const BgMaterial = shaderMaterial(
  {
    u_texture: undefined,
    u_uv_scale: undefined,
  },
  `
  varying vec2 v_uv;
  void main() {
    v_uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,
  `
  uniform sampler2D u_texture;
  uniform vec2 u_uv_scale;
  varying vec2 v_uv;
  void main() {
    vec2 scaledUv = (v_uv - 0.5) * u_uv_scale + 0.5;
    gl_FragColor = texture2D(u_texture, scaledUv);
  }
`
);

extend({ BgMaterial });

export const Background = (props) => {
  const { img } = props;
  const ref = useRef();
  const { size } = useThree();
  const [texture1] = useTexture([img]);

  useFrame(() => {
    const aspect = size.width / size.height;

    ref.current.u_texture = texture1;
    ref.current.u_uv_scale = calcCoveredTextureScale(texture1, aspect);
  });

  return (
    <mesh scale={[size.width, size.height, 1]}>
      <planeBufferGeometry />
      <bgMaterial ref={ref} />
    </mesh>
  );
};

Background.propTypes = {
  img: PropTypes.string,
};
