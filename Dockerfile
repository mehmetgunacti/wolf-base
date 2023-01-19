FROM nginx

COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY nginx/security-headers.conf /etc/nginx/security-headers.conf

# COPY apidoc /usr/share/nginx/html/apidoc

COPY dist/wolf-base /usr/share/nginx/html
