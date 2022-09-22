#!/usr/bin/env python3
import os
user_program_menu_dir = "/home/Pydes/.local/share/applications/"
desktop_icon_template = '''[Desktop Entry]
Name={}
GenericName={}
Comment={}
Exec={} %%U
Icon={}
Terminal=false
Type=Application
Categories=PydesMenu
StartupNotify=false
''' 
# if os.getuid() !=0 :
#     error_tips = ">_ This program must be run as root. Aborting."
#     print(error_tips)
#     os._exists(0)
# else:
desktop_file_name='weixin' + '.desktop'
exec_show_name = 'weixin'
exec_desc = 'weixin'
exec_path = '/home/Pydes/Project/weixin/startup.sh'
exec_icon_path = '/home/Pydes/Project/weixin/app_icon/weixin.png'
if desktop_file_name and exec_show_name and exec_path and exec_icon_path:
    desktop_icon_file = desktop_icon_template.format(exec_show_name, exec_show_name, exec_desc, exec_path, exec_icon_path)
    program_file_path = user_program_menu_dir + desktop_file_name
    with open(program_file_path, 'w+') as action_file:
        action_file.write(desktop_icon_file)
    os.system('cat {}'.format(program_file_path)) 
else:
    error_tips = "输入信息不能为空"
    os._exists(0)
