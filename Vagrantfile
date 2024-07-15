env = {}
File.read(".env").split("\n").each do |ef|
  env[ef.split("=")[0]] = ef.split("=")[1]
end

GATEWAY = env['GATEWAY_IP']
INVENTORY = env['INVENTORY_IP']
BILLING = env['BILLING_IP']

def conf_vm(conf, name, ip, sh)
  conf.vm.define "#{name}" do |vm|
  vm.vm.synced_folder "./srcs/#{name}", "/home/vagrant/#{name}", type: "rsync", :mount_options => ["dmode = 777", "fmode = 666"], rsync__exclude: ['node_modules/']
  vm.vm.network "private_network", ip: ip
  sh.each do |script|
    privileged = script == "node" ? false : true
    vm.vm.provision "shell", path: "./scripts/#{script}.sh", run: "once", privileged: privileged, args: [name]
    end
  end
end


Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"
  config.vm.provision "file", source: "./.env", destination: "/home/vagrant/.env"
  
  conf_vm(config, "inventory-app", INVENTORY, ["psql","server"])
  conf_vm(config, "billing-app", BILLING, ["psql", "queue","server"])
  conf_vm(config, "gateway-app", GATEWAY, ["server"])
end
#"debian/jessie64"