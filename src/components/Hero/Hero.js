import './Hero.css';

export const createHero = ({
  headline = 'Du bist vollkommen. Genau so, wie du bist.',
  subline = 'Vielleicht kennst du den leisen Wunsch, wieder mehr bei dir selbst anzukommen. In einer Welt voller Erwartungen lade ich dich ein, innezuhalten – und dich daran zu erinnern, wer du im Kern bist.',
  onBookingClick
}) => {
  const section = document.createElement('section');
  section.className = 'hero sunlight-hero';
  section.id = 'start';

  section.innerHTML = `
    <canvas id="storybookSunlightCanvas" class="sunlight-shader-canvas"></canvas>
    <div class="wrap sunlight-hero-wrap">
      <div class="hero-left-col">
        <h1 class="hero-title">${headline}</h1>
        <p class="hero-lead">${subline}</p>
      </div>
    </div>
  `;

  // Initialize Afternoon Sunlight Shader on the canvas
  setTimeout(() => {
    const canvas = section.querySelector('#storybookSunlightCanvas');
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: true }) || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vsSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;

      vec2 hash2(vec2 p) {
        return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
      }

      float worley(vec2 p, float t) {
        vec2 n = floor(p);
        vec2 f = fract(p);
        float d = 1.0;
        for (int j = -1; j <= 1; j++) {
          for (int i = -1; i <= 1; i++) {
            vec2 g = vec2(float(i), float(j));
            vec2 o = hash2(n + g);
            o = 0.5 + 0.42 * sin(t * 0.75 + 6.283185 * o);
            vec2 delta = g + o - f;
            d = min(d, length(delta));
          }
        }
        return 1.0 - d;
      }

      float sampleLight(vec2 uv, vec2 dir, vec2 perp, float t) {
        float along = uv.x * dir.x + uv.y * dir.y;
        float ortho = uv.x * perp.x + uv.y * perp.y;

        // Curtain billowing in the breeze: undulating fabric folds
        vec2 curtainWarp = vec2(
          sin(ortho * 3.6 + t * 0.85) * 0.12 + sin(along * 2.2 - t * 0.70) * 0.08,
          cos(along * 2.8 + t * 0.95) * 0.10 + cos(ortho * 2.0 - t * 0.60) * 0.06
        );

        // Soft fabric caustic ripples
        vec2 p = vec2(along + curtainWarp.y * 0.7, ortho + curtainWarp.x * 0.8) * vec2(1.1, 4.5);
        float w1 = worley(p, t);
        float w2 = worley(p * 1.6 + vec2(3.1, 1.7), t * 1.2) * 0.45;
        float caustics = w1 * 0.65 + w2 * 0.35;

        // Distinct sunlight bands & curtain folds swaying back and forth
        float foldSway = sin(t * 0.65 + along * 1.5) * 0.25;
        float b1 = sin((ortho + curtainWarp.x * 0.6 + foldSway) * 11.5 - t * 0.80) * 0.5 + 0.5;
        float b2 = sin((ortho + curtainWarp.x * 0.4) * 21.0 + t * 0.65) * 0.35 + 0.35;
        float b3 = sin((ortho + foldSway * 0.5) * 6.0 - t * 0.45) * 0.5 + 0.5;
        float beams = b1 * 0.45 + b2 * 0.28 + b3 * 0.27;

        // Atmospheric beam focus: brightest coming from upper-left
        float beamFocus = exp(-pow((ortho - 0.15) * 0.85, 2.0));
        float total = (caustics * 0.38 + beams * 0.62) * (0.35 + 0.65 * beamFocus);
        return smoothstep(0.18, 0.76, total);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 uv = st;
        uv.x *= aspect;

        // Direction from upper-left to bottom-right (~40 degrees)
        float rad = radians(40.0);
        vec2 dir = normalize(vec2(cos(rad), -sin(rad)));
        vec2 perp = vec2(-dir.y, dir.x);

        // Faster, lively curtain animation speed (~2.5x previous speed)
        float t = u_time * 1.85;

        // Subtle chromatic aberration at ray edges
        float chr = 0.010;
        float lightR = sampleLight(uv - perp * chr, dir, perp, t);
        float lightG = sampleLight(uv, dir, perp, t);
        float lightB = sampleLight(uv + perp * chr, dir, perp, t);

        // Exact Afternoon Sunlight Palette from shaders.com:
        // Base gray wall: #c4c4c4 | Taupe shadow: #a69f9f | Off-white sunlight: #fcf8f0
        vec3 colBg    = vec3(0.782, 0.778, 0.776); // Clean neutral light gray wall
        vec3 colTaupe = vec3(0.675, 0.650, 0.645); // Gentle taupe shadow
        vec3 colSun   = vec3(0.995, 0.985, 0.965); // Warm luminous sunlight beam
        vec3 colGleam = vec3(1.000, 1.000, 1.000); // Prismatic core gleam

        // Per-channel mixing with chromatic dispersion
        float r = mix(colTaupe.r, colSun.r, smoothstep(0.18, 0.82, lightR));
        float g = mix(colTaupe.g, colSun.g, smoothstep(0.18, 0.82, lightG));
        float b = mix(colTaupe.b, colSun.b, smoothstep(0.18, 0.82, lightB));
        vec3 col = vec3(r, g, b);

        // Ambient wall mix
        col = mix(colBg, col, 0.68);

        // Prismatic gleam at highlights
        float gleam = smoothstep(0.68, 0.94, lightG);
        col = mix(col, colGleam, gleam * 0.45);

        // Seamless bottom blend into section background (#F1EDE6)
        vec3 colPageBg = vec3(0.945, 0.929, 0.902);
        float bottomFade = smoothstep(0.0, 0.12, st.y);
        col = mix(colPageBg, col, bottomFade);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const vs = compile(gl.VERTEX_SHADER, vsSource);
    const fs = compile(gl.FRAGMENT_SHADER, fsSource);
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1, -1,  1,
      -1,  1,  1, -1,  1,  1
    ]), gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uTime = gl.getUniformLocation(prog, 'u_time');

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth || 800;
      const h = canvas.clientHeight || 600;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();

    const startTime = performance.now();
    function render(now) {
      if (!section.isConnected) return; // Stop if unmounted in Storybook
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - startTime) * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    window.addEventListener('resize', resize);
  }, 50);

  return section;
};
