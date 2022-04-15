#version 330

uniform vec3 u_cam_pos;
uniform vec3 u_light_pos;
uniform vec3 u_light_intensity;

uniform vec4 u_color;

uniform sampler2D u_texture_2;
uniform vec2 u_texture_2_size;

uniform float u_normal_scaling;
uniform float u_height_scaling;

in vec4 v_position;
in vec4 v_normal;
in vec4 v_tangent;
in vec2 v_uv;

out vec4 out_color;

float h(vec2 uv) {
  // You may want to use this helper function...
  return texture(u_texture_2, uv).r;
}

void main() {
  // YOUR CODE HERE
  
  // (Placeholder code. You will want to replace it.)
  vec3 b = cross(v_normal.xyz, v_tangent.xyz);
  mat3 tbn = mat3(v_tangent.xyz, b, v_normal.xyz);
  float duvecval = (v_uv.x + 1) / u_texture_2_size.x;
  vec2 duvec = vec2(duvecval, v_uv.y);
  float dvvecval = (v_uv.y + 1) / u_texture_2_size.y;
  vec2 dvvec = vec2(v_uv.x, dvvecval);
  float du = (h(duvec) - h(v_uv)) * u_height_scaling * u_normal_scaling;
  float dv = (h(dvvec) - h(v_uv)) * u_height_scaling * u_normal_scaling;
  vec3 no = vec3(-du, -dv, 1);
  vec3 nd = normalize(tbn * no);
  vec4 newLight = vec4(u_light_pos.x, u_light_pos.y, u_light_pos.z, 0);
  float test = dot(vec4(nd.x, nd.y, nd.z, 1), normalize(newLight));
  vec4 newLightPos = vec4(u_light_pos.x, u_light_pos.y, u_light_pos.z, 0);
  float r = distance(newLightPos, v_position);
  float r2 = r * r;
  vec3 test2 = (u_light_intensity / r2) * max(0, test);
  out_color = vec4(test2.x, test2.y, test2.z, 1);
  out_color.a = 1;
}

