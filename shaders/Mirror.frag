#version 330


uniform vec3 u_cam_pos;

uniform samplerCube u_texture_cubemap;

in vec4 v_position;
in vec4 v_normal;
in vec4 v_tangent;

out vec4 out_color;

void main() {
  // YOUR CODE HERE
  vec3 wo =  u_cam_pos - v_position.xyz;
  vec3 n = v_normal.xyz;

  vec3 wi = -1 * wo + 2 * (wo * n) * n;

  out_color = texture(u_texture_cubemap, wi);

  out_color.a = 1;
}
