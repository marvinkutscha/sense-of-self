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
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = fract(sin(dot(i, vec2(12.9898, 78.233))) * 43758.5453);
        float b = fract(sin(dot(i + vec2(1.0, 0.0), vec2(12.9898, 78.233))) * 43758.5453);
        float c = fract(sin(dot(i + vec2(0.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453);
        float d = fract(sin(dot(i + vec2(1.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453);
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      float worley(vec2 p, float t) {
        vec2 n = floor(p);
        vec2 f = fract(p);
        float d = 1.0;
        for (int j = -1; j <= 1; j++) {
          for (int i = -1; i <= 1; i++) {
            vec2 g = vec2(float(i), float(j));
            vec2 o = hash2(n + g);
            o = 0.5 + 0.45 * sin(t * 0.45 + 6.2831 * o);
            vec2 delta = g + o - f;
            d = min(d, length(delta));
          }
        }
        return d;
      }
      float sampleLight(vec2 p, vec2 dir, vec2 perp, float t) {
        float ortho = dot(p, perp);
        float b1 = sin(ortho * 3.6 - t * 0.22) * 0.5 + 0.5;
        float b2 = sin(ortho * 7.5 + t * 0.15) * 0.35 + 0.35;
        float b3 = sin(ortho * 1.5 - t * 0.09) * 0.5 + 0.5;
        float beams = b1 * 0.50 + b2 * 0.28 + b3 * 0.22;
        float w = worley(p * 2.5 - dir * (t * 0.25), t);
        float caustics = 1.0 - smoothstep(0.12, 0.82, w);
        float drift = noise(p * 1.3 + vec2(t * 0.04, -t * 0.03));
        float total = mix(beams, caustics, 0.45);
        total *= (0.75 + 0.25 * drift);
        return clamp(total, 0.0, 1.0);
      }
      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 uv = st;
        uv.x *= aspect;
        float rad = radians(36.0);
        vec2 dir = vec2(cos(rad), sin(rad));
        vec2 perp = vec2(-dir.y, dir.x);
        float t = u_time * 0.85;

        float chrOffset = 0.016;
        float lightR = sampleLight(uv - perp * chrOffset, dir, perp, t);
        float lightG = sampleLight(uv, dir, perp, t);
        float lightB = sampleLight(uv + perp * chrOffset, dir, perp, t);

        vec3 colShadow = vec3(0.780, 0.710, 0.650);
        vec3 colBase   = vec3(0.945, 0.929, 0.902);
        vec3 colGold   = vec3(0.850, 0.740, 0.620);
        vec3 colSun    = vec3(1.000, 0.965, 0.880);
        vec3 colGleam  = vec3(1.000, 0.992, 0.965);

        vec3 col;
        col.r = mix(colShadow.r, colSun.r, pow(lightR, 1.35));
        col.g = mix(colBase.g,   colSun.g, pow(lightG, 1.35));
        col.b = mix(colGold.b,   colSun.b, pow(lightB, 1.35));

        float gleam = pow(lightG, 2.8);
        col = mix(col, colGleam, gleam * 0.55);

        float bottomFade = smoothstep(0.0, 0.14, st.y);
        col = mix(colBase, col, bottomFade);

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
