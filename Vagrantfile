# env = {}
# File.read(".env").split("\n").each do |ef|
#   env[ef.split("=")[0]] = ef.split("=")[1]
# end

# GATEWAY = env['GATEWAY_IP']
# INVENTORY = env['INVENTORY_IP']
# BILLING = env['BILLING_IP']

# def conf_vm(conf, name, ip, sh)
#   # conf.vm.define "#{name}" do |vm|
#   #vm.vm.synced_folder "./srcs/#{name}", "/home/vagrant/#{name}"#, type: "rsync", :mount_options => ["dmode = 777", "fmode = 666"], rsync__exclude: ['node_modules/']
#   #vm.vm.network "private_network", ip: ip
#   sh.each do |script|
#     privileged = script == "node" ? false : true
#     # vm.vm.provision "shell", path: "./scripts/#{script}.sh", run: "once", privileged: privileged, args: [name]
#     end
#   end



Vagrant.configure("2") do |config|
  servers = [
    {
      :hostname => "gateway-vm",
      :box => "ubuntu/focal64",
      :ip => "192.168.56.50",
      :ssh_port => "2200"
    },
    {
      :hostname => "inventory-vm",
      :box => "ubuntu/focal64",
      :ip => "192.168.56.51",
      :ssh_port => "2201"
    },
    {
      :hostname => "billing-vm",
      :box => "ubuntu/focal64",
      :ip => "192.168.56.52",
      :ssh_port => "2202"
    }
  ]

  servers.each do |machine|
    config.vm.synced_folder "./srcs", "/vagrant/srcs", type: "virtualbox"
    config.vm.provision "file", source: "./.env", destination: "/home/vagrant/.env"
    config.vm.define machine[:hostname] do |node|
      node.vm.box = machine[:box]
      node.vm.hostname = machine[:hostname]
      node.vm.network :private_network, ip: machine[:ip]
      node.vm.network "forwarded_port", guest: 22, host: machine[:ssh_port], id: "ssh"
      node.vm.provision "shell", inline: <<-SHELL
        # Install prerequisites
        sudo apt-get update

        # # Copy srcs directory
        cp -r /vagrant/srcs /home/vagrant/#{machine[:hostname]}_srcs
        cd /home/vagrant/#{machine[:hostname]}_srcs

        # Ensure the package-lock.json files are copied to their respective directories
        if [ "#{machine[:hostname]}" == "gateway-vm" ]; then
          cd gateway-app
          sudo chmod +x ./setup_gateway.sh
          ./setup_gateway.sh
        elif [ "#{machine[:hostname]}" == "inventory-vm" ]; then
        cd inventory-app
        sudo chmod +x ./setup_inventory.sh
        ./setup_inventory.sh
        elif [ "#{machine[:hostname]}" == "billing-vm" ]; then
        cd billing-app
        sudo chmod +x ./setup_billing.sh
        ./setup_billing.sh
        fi
      SHELL
      node.vm.provider :virtualbox do |vb|
        vb.customize ["modifyvm", :id, "--memory", 1024]
        vb.customize ["modifyvm", :id, "--cpus", 1]
      end
    end
  end

  
  # conf_vm(config, "inventory-app", INVENTORY, ["server", "psql"])
  # conf_vm(config, "billing-app", BILLING, ["server", "psql", "queue"])
  # conf_vm(config, "gateway-app", GATEWAY, ["server"])
end
#"debian/jessie64"