uniform float time;
uniform vec3 color;
uniform vec2 iResolution;
varying vec2 vUv;
#pragma glslify: random = require(glsl-random)

void main() {
//   gl_FragColor.rgba = vec4(color + sin(time) * 0.2, 1.0);

	vec2 uv = (-iResolution.xy + 2.0 * vUv.xy) / iResolution.y;
    vec2 uv2 = uv;
    //Asin a + B sin 2a +C sin 3a +D sin 4a
    uv2.x += iResolution.x/iResolution.y;
    uv2.x -= 2.0*mod(time,1.0*iResolution.x/iResolution.y);
    float width = -(1.0/(25.0*uv2.x));
   	vec3 l = vec3(width , width* 1.9, width * 1.5);
    
    uv.y *= 2.0;
    float xx = abs(1.0/(20.0*max(abs(uv.x),0.3)));
    
    uv.x *=3.0;
    uv.y -= xx*(sin(uv.x)+3.0*sin(2.0*uv.x)+2.0*sin(3.0*uv.x)+sin(4.0*uv.x)+0.3*sin(uv.x)+0.2*sin(uv.x*2.0)+0.1*sin(uv.x*3.0)+0.1*sin(uv.x*4.0));
    vec3 col = mix(vec3(1),vec3(0),smoothstep(0.02,0.03,abs(uv.y)));
	gl_FragColor = vec4(col*l,1.0);
}