# Guía de Despliegue en AWS EC2

## 📋 Información del Servidor

- **IP Pública:** `[TU-IP-PUBLICA]`
- **URL:** http://[TU-IP-PUBLICA]
- **Usuario:** `ec2-user`
- **Key Pair:** `ec2-portafolio.pem`
- **Región:** `us-east-2` (Ohio)
- **Tipo de Instancia:** `t3.micro` (Free Tier)
- **Sistema Operativo:** Amazon Linux 2023
- **Servidor Web:** Nginx

---

## 🔌 Conectarse al Servidor

### Desde tu PC (PowerShell/CMD):
```powershell
# Navegar a donde está el archivo .pem
cd C:\Users\cesar\Downloads

# Conectarse por SSH
ssh -i ec2-portafolio.pem ec2-user@[TU-IP-PUBLICA]
```

### Salir del servidor:
```bash
exit
```

---

## 🛠️ Comandos de Nginx

### **Iniciar Nginx**
```bash
sudo systemctl start nginx
```

### **Detener Nginx**
```bash
sudo systemctl stop nginx
```

### **Reiniciar Nginx**
```bash
sudo systemctl restart nginx
```

### **Pausar Nginx (sin detenerlo completamente)**
```bash
# Recargar configuración sin interrumpir conexiones activas
sudo systemctl reload nginx
```

### **Ver estado de Nginx**
```bash
sudo systemctl status nginx
```
Presiona `q` para salir.

### **Habilitar Nginx (inicio automático)**
```bash
sudo systemctl enable nginx
```

### **Deshabilitar Nginx (no iniciar automáticamente)**
```bash
sudo systemctl disable nginx
```

### **Verificar configuración de Nginx**
```bash
sudo nginx -t
```

---

## 🚀 Despliegue Inicial (Primera vez)

### **1. Conectarse al servidor**
```bash
ssh -i ec2-portafolio.pem ec2-user@[TU-IP-PUBLICA]
```

### **2. Actualizar sistema e instalar software**
```bash
# Actualizar paquetes
sudo dnf update -y

# Instalar Nginx y Git
sudo dnf install nginx git -y

# Instalar Node.js
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install nodejs -y
```

### **3. Iniciar Nginx**
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

### **4. Clonar repositorio**
```bash
cd /home/ec2-user
git clone https://github.com/CesarArathAP/portafolio-2.git
cd portafolio-2
```

### **5. Cambiar a rama aws-version**
```bash
git checkout aws-version
```

### **6. Instalar dependencias y compilar**
```bash
npm install
npm run build
```

### **7. Desplegar archivos**
```bash
# Crear directorio
sudo mkdir -p /var/www/portafolio

# Copiar archivos compilados
sudo cp -r dist/* /var/www/portafolio/

# Cambiar permisos
sudo chown -R nginx:nginx /var/www/portafolio
sudo chmod -R 755 /var/www/portafolio
```

### **8. Configurar Nginx**
```bash
sudo bash -c 'cat > /etc/nginx/nginx.conf << "EOF"
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    sendfile on;
    keepalive_timeout 65;
    
    server {
        listen 80;
        server_name _;
        root /var/www/portafolio;
        index index.html;
        
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        location ~* \.(css|js)$ {
            add_header Content-Type text/css;
            expires 1y;
        }
    }
}
EOF'
```

### **9. Verificar y reiniciar Nginx**
```bash
sudo nginx -t
sudo systemctl restart nginx
```

### **10. Verificar despliegue**
Abre en el navegador: http://[TU-IP-PUBLICA]

---

## 🔄 Actualizar el Portafolio

Cuando hagas cambios en tu código:

```bash
# 1. Conectarse
ssh -i ec2-portafolio.pem ec2-user@[TU-IP-PUBLICA]

# 2. Ir al proyecto
cd /home/ec2-user/portafolio-2

# 3. Actualizar código
git pull origin aws-version

# 4. Recompilar
npm run build

# 5. Eliminar archivos antiguos
sudo rm -rf /var/www/portafolio/*

# 6. Copiar archivos nuevos
sudo cp -r dist/* /var/www/portafolio/

# 7. Reiniciar Nginx
sudo systemctl restart nginx

# 8. Salir
exit
```

---

## 📊 Monitoreo y Logs

### **Ver logs en tiempo real**
```bash
sudo tail -f /var/log/nginx/access.log
```
Presiona `Ctrl + C` para salir.

### **Ver últimas 50 visitas**
```bash
sudo tail -50 /var/log/nginx/access.log
```

### **Ver errores**
```bash
sudo tail -50 /var/log/nginx/error.log
```

### **Contar visitas del día**
```bash
sudo grep "$(date +%d/%b/%Y)" /var/log/nginx/access.log | wc -l
```

### **Ver uso de CPU y memoria**
```bash
top
```
Presiona `q` para salir.

### **Ver uso de disco**
```bash
df -h
```

### **Ver procesos de Nginx**
```bash
ps aux | grep nginx
```

### **Ver conexiones activas**
```bash
sudo netstat -an | grep :80
```

---

## 🔧 Mantenimiento del Servidor

### **Limpiar logs antiguos**
```bash
sudo truncate -s 0 /var/log/nginx/access.log
sudo truncate -s 0 /var/log/nginx/error.log
```

### **Ver archivos desplegados**
```bash
ls -la /var/www/portafolio/
ls -la /var/www/portafolio/_astro/
```

### **Reiniciar instancia EC2 (desde AWS Console)**
1. Ve a: https://console.aws.amazon.com/ec2/
2. Selecciona tu instancia
3. Instance state → Reboot instance

### **Detener instancia EC2 (ahorra costos)**
1. Ve a: https://console.aws.amazon.com/ec2/
2. Selecciona tu instancia
3. Instance state → Stop instance

⚠️ **Nota:** Al detener la instancia, la IP pública cambiará al reiniciarla.

---

## 🛑 Pausar/Detener el Servidor

### **Opción 1: Detener solo Nginx (servidor sigue corriendo)**
```bash
# Detener Nginx
sudo systemctl stop nginx

# Verificar que está detenido
sudo systemctl status nginx

# Iniciar de nuevo cuando lo necesites
sudo systemctl start nginx
```

### **Opción 2: Detener la instancia EC2 completa**

**Desde AWS Console:**
1. Ve a: https://console.aws.amazon.com/ec2/
2. Instances → Selecciona "Cesar Arath - Portafolio"
3. Instance state → **Stop instance**

**Costos:**
- ✅ Instancia detenida: $0/hora (no se cobra)
- ⚠️ Almacenamiento EBS: ~$0.10/mes (se sigue cobrando)

**Para iniciar de nuevo:**
1. Instance state → **Start instance**
2. ⚠️ La IP pública cambiará (anota la nueva)

### **Opción 3: Terminar instancia (eliminar permanentemente)**

⚠️ **CUIDADO:** Esto elimina todo permanentemente.

1. Instance state → **Terminate instance**
2. Confirma la acción
3. Se perderá todo (código, configuración, archivos)

---

## 💰 Monitoreo de Costos

### **Free Tier Usage**
https://console.aws.amazon.com/billing/home#/freetier

**Límites:**
- 750 horas/mes de t2.micro o t3.micro
- 30 GB de almacenamiento EBS
- 15 GB de transferencia de datos

### **Billing Dashboard**
https://console.aws.amazon.com/billing/

**Ver:**
- Gasto actual del mes
- Proyección de costos
- Alertas configuradas

---

## 🔐 Security Group (Firewall)

### **Reglas de entrada actuales:**
```
SSH (22)    - 0.0.0.0/0
HTTP (80)   - 0.0.0.0/0
HTTPS (443) - 0.0.0.0/0
```

### **Editar Security Group:**
1. Ve a: https://console.aws.amazon.com/ec2/
2. Security Groups → `launch-wizard-1`
3. Inbound rules → Edit inbound rules

---

## 📝 Checklist de Verificación

- [ ] EC2 está corriendo (Running)
- [ ] Nginx está activo (`sudo systemctl status nginx`)
- [ ] Archivos en `/var/www/portafolio/`
- [ ] Security Group permite HTTP (puerto 80)
- [ ] Sitio accesible en http://[TU-IP-PUBLICA]

---

## 🆘 Solución de Problemas

### **Problema: Sitio no carga**
```bash
# Verificar que Nginx está corriendo
sudo systemctl status nginx

# Ver errores
sudo tail -50 /var/log/nginx/error.log

# Reiniciar Nginx
sudo systemctl restart nginx
```

### **Problema: Sin estilos CSS**
```bash
# Verificar que los archivos existen
ls -la /var/www/portafolio/_astro/

# Verificar permisos
sudo chown -R nginx:nginx /var/www/portafolio
sudo chmod -R 755 /var/www/portafolio

# Reiniciar Nginx
sudo systemctl restart nginx
```

### **Problema: No puedo conectarme por SSH**
- Verifica que la instancia esté corriendo (AWS Console)
- Verifica que estás usando la IP correcta
- Verifica que el archivo .pem tiene permisos correctos
- Verifica que el Security Group permite SSH (puerto 22)

---

## 📚 Enlaces Útiles

- **EC2 Console:** https://console.aws.amazon.com/ec2/
- **Billing:** https://console.aws.amazon.com/billing/
- **CloudWatch:** https://console.aws.amazon.com/cloudwatch/
- **IAM:** https://console.aws.amazon.com/iam/

---

## 🎯 Comandos Rápidos

```bash
# Conectar
ssh -i ec2-portafolio.pem ec2-user@[TU-IP-PUBLICA]

# Actualizar portafolio
cd /home/ec2-user/portafolio-2 && git pull origin aws-version && npm run build && sudo rm -rf /var/www/portafolio/* && sudo cp -r dist/* /var/www/portafolio/ && sudo systemctl restart nginx

# Ver logs
sudo tail -f /var/log/nginx/access.log

# Reiniciar Nginx
sudo systemctl restart nginx

# Salir
exit
```

---

**Última actualización:** 2026-02-04
**Versión:** 1.0
