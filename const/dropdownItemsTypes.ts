export const RoutesProtocols = {
  GPRC: 'grpc',
  GPRCS: 'grpcs',
  GPRCGPRCS: 'grpc,grpcs',
  HTTP: 'http',
  HTTPS: 'https',
  HTTPHTTPS: 'http,https',
  TCP: 'tcp',
  TLS: 'tls',
  TLSUDP: 'tls,udp',
  TCPUDP: 'tcp,udp',
  TCPTLS: 'tcp,tls',
  TCPTLSUDP: 'tcp,tls,udp',
  TLSPASSTHROUGH: 'tls_passthrough',
  UDP: 'udp',
  WS: 'ws',
  WSS: 'wss',
  WSWSS: 'ws,wss',
}

export const PathHandling = {
  V0: 'v0',
  V1: 'v1',
}