#qemu-kvm-4-abs-beginners.sh 
https://www.youtube.com/watch?v=BgZHbCDFODk

cmd - egrep -c '(vmx|svm)' /proc/cpuinfo > 0 indicates ready for virtualization
if above cmd == 0 change boot settings

1. qemu-kvm: the emulator itself
2. libvirt-daemon: runs virtualization in background
3. Bridge-utils: important networking dependencies
4. Virt-manager: The graphical program we'll use to work with our VMs
    
    eg: on ubuntu it is necessary to add the user to the kvm and libvirt group
        sudo usermod -aG libvirt vkc
        sudo usermod -aG kvm vkc

libvirt needs to be running 
        sudo systemctl start libvirtd
    and to start on boot
        sudo systemctl enable libvirtd

Vid demos Virt-manager by Red-Hat
See virsh for commandline control of VMs



