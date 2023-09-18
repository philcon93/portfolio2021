import * as THREE from "three";

export class RippleRenderer {
  /**
   * constructor
   * @param _texture ripple texture
   */
  constructor(_texture) {
    this._scene = new THREE.Scene();
    this._target = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight
    );
    // camera
    const { width, height, near, far } = this._cameraProps();
    this._camera = new THREE.OrthographicCamera(
      -width,
      width,
      height,
      -height,
      near,
      far
    );
    this._camera.position.set(0, 0, 2);

    //
    this._meshs = [];
    /** Maximum number of ripples drawn */
    this._max = 100;
    /** How far the mouse must move in one frame before drawing */
    this._frequency = 5;
    /** mouse coordinates */
    this._mouse = new THREE.Vector2(0, 0);
    /** mouse coordinates in the previous frame */
    this._prevMouse = new THREE.Vector2(0, 0);
    /** The index of the ripple drawn at the current frame */
    this._currentWave = 0;
    this._texture = _texture;

    // mesh
    this._createMesh();
    // events
    window.addEventListener("mousemove", this._handleMouseMove);
    window.addEventListener("touchmove", this._handleTouchMove);
    window.addEventListener("resize", this._handleResize);
  }

  _cameraProps = () => {
    const frustumSize = window.innerHeight;
    const aspect = window.innerWidth / window.innerHeight;
    const [w, h] = [(frustumSize * aspect) / 2, frustumSize / 2];
    return { width: w, height: h, near: -1000, far: 1000 };
  };

  _createMesh = () => {
    const size = 64;
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.MeshBasicMaterial({
      map: this._texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
      //
      // colorWrite: false,
      // depthWrite: false,
      stencilWrite: true,
      stencilRef: 1,
      stencilFunc: THREE.AlwaysStencilFunc,
      stencilFail: THREE.ReplaceStencilOp,
      stencilZFail: THREE.ReplaceStencilOp,
      stencilZPass: THREE.ReplaceStencilOp,
    });
    for (let i = 0; i < this._max; i++) {
      const mesh = new THREE.Mesh(geometry.clone(), material.clone());
      mesh.rotateZ(2 * Math.PI * Math.random());
      mesh.visible = false;
      mesh.renderOrder = 2;
      this._scene.add(mesh);
      this._meshs.push(mesh);
    }
  };

  _handleMouseMove = (e) => {
    const x = e.clientX - window.innerWidth / 2;
    const y = window.innerHeight / 2 - e.clientY;

    this._mouse.x = x;
    this._mouse.y = y;
  };

  _handleTouchMove = (e) => {
    const { clientX, clientY } = e.touches[0];
    const x = clientX - window.innerWidth / 2;
    const y = window.innerHeight / 2 - clientY;

    this._mouse.x = x;
    this._mouse.y = y;
  };

  _handleResize = () => {
    const { width, height } = this._cameraProps();
    this._camera.left = -width;
    this._camera.right = width;
    this._camera.top = height;
    this._camera.bottom = -height;
    this._camera.updateProjectionMatrix();
    this._target.setSize(window.innerWidth, window.innerHeight);
  };

  _setNewWave = () => {
    const mesh = this._meshs[this._currentWave];
    mesh.visible = true;
    mesh.position.set(this._mouse.x, this._mouse.y, 0);
    mesh.scale.x = mesh.scale.y = 0.2;
    mesh.material.opacity = 0.5;
  };

  _trackMousePos = () => {
    // Distance between current mouse coordinates and previous frame's mouse coordinates
    const distance = this._mouse.distanceTo(this._prevMouse);
    if (this._frequency < distance) {
      this._setNewWave();
      this._currentWave = (this._currentWave + 1) % this._max;
      // console.log(this._currentWave)
    }
    this._prevMouse.x = this._mouse.x;
    this._prevMouse.y = this._mouse.y;
  };

  /**
   * update the drawing
   * @param gl main renderer
   * @param uTexture A uniform to store the ripple drawing result
   */
  update = (gl, uTexture) => {
    this._trackMousePos();

    gl.setRenderTarget(this._target);
    gl.render(this._scene, this._camera);
    uTexture.value = this._target.texture;
    gl.setRenderTarget(null);
    gl.clear();

    this._meshs.forEach((mesh) => {
      if (mesh.visible) {
        const material = mesh.material;
        mesh.rotation.z += 0.02;
        material.opacity *= 0.97;
        mesh.scale.x = 0.98 * mesh.scale.x + 0.17;
        mesh.scale.y = mesh.scale.x;
        if (material.opacity < 0.002) mesh.visible = false;
      }
    });
  };

  /**
   * destroy the instance
   */
  dispose = () => {
    window.removeEventListener("mousemove", this._handleMouseMove);
    window.removeEventListener("touchmove", this._handleTouchMove);
    window.removeEventListener("resize", this._handleResize);
  };
}
