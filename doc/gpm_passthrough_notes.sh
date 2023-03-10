#gpm_passthrough_notes.sh
https://www.youtube.com/watch?v=Xd8YPTst7U0

run multiple vm's each with its own gpu
mb must support vtd for intel and vtx for amd

ASRock B450M Pro4 micro Atx 
only 2 x4 pcie slots
1 - x1 slot for usb ASC enabled may make it available to vm


Gigyabyte AMD X470 AORUS ATX mb
3 PCIE slots x16 physical
2 pcie x1 slots

ASRock Z390 Phantom Gaming-ITX/ac
thunderbolt port allows for intel processor with built in graphics and
1 pciex16 for vm passthrough
Thunderbolt allows thnderblt monitor to act as kvm switch

X299X Designare 10G(rev. 1.0) Intel x299
2 PCIe x16
2 PCIe x8
2 M.2 Socket 3
includes plx chip to act as switch between pci/gpus which in theory reduces bandwidth

