#version 330

uniform vec4 u_color;
uniform vec3 u_cam_pos;
uniform vec3 u_light_pos;
uniform vec3 u_light_intensity;

in vec4 v_position;
in vec4 v_normal;
in vec2 v_uv;

out vec4 out_color;

void main() {
  // YOUR CODE HERE
  

  float ka = 0.2;
  float kd = 0.8;
  float ks = 0.7;
  float Ia = 0.9;
  float p = 20.0;

  vec3 lightDiff = u_light_pos - v_position.xyz;
  vec3 camDiff = u_cam_pos - v_position.xyz;
  // where is my jungleDiff
  float r = length(lightDiff);
  float r2 = r*r;
  vec3 In_n_Out =  normalize(normalize(lightDiff) + normalize(camDiff));
	
  float firstMax = max(0.0, dot(v_normal.xyz, normalize(lightDiff))) / r2;
  float secondMax = pow(max(0.0, dot(v_normal.xyz, normalize(In_n_Out))), p) / r2;
  vec3 shader = ka * Ia + ((u_light_intensity) * (kd * firstMax)) + ((ks * secondMax) * (u_light_intensity));  
  
  out_color = vec4(shader, 10.0);
  out_color.a = 1;
}

