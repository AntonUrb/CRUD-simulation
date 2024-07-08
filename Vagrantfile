env = {}
File.read(".env").split("\n").each do |ef|
  env[ef.split("=")[0]] = ef.split("=")[1]
end

def conf_vm(conf, name, ip, sh)
  conf.vm.define"#{name}_vm" do |vm|
  vm.vm.synced_folder "./srcs/#{name}", "/home/vagrant/#{name}", type: "rsync", :mount_options => ["dmode = 777", "fmode = 666"], rsync__exclude: ['node_modules/']
  vm.vm.network "private_network", ip: ip
  scripts.each do |sh|
    privileged = script == "node" ? false : true
    vm.vm.provision "shell", path: "./script/#{script}.sh", run: "once", privileged: privileged, args: [name]
    end
  end
end

Vagrant.configure("2") do |config|
  config.vm.box = "base"
  config.vm.box = "debian/jessie64"

  conf_vm(config, "inventory-app", env["INVENTORY_IP"], ["server", "psql"])
  conf_vm(config, "billing-app", env["BILLING_IP"], ["server", "psql", "queue"])
  conf_vm(config, "gateway-app", env["GATEWAY_IP"], ["server"])
end
