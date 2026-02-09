"use strict";
/**
 * Translations
 */

var lang = {};

/**
 * Just get a translation value for given key
 * @param {string} key
 * @param {object=} params
 * @return {string}
 */
lang.get = function (key, params) {
    var v = key;
    if (typeof lang.values[lang.language] != "undefined" && typeof lang.values[lang.language][key] != "undefined") {
        v = lang.values[lang.language][key];
    } else if (typeof lang.values["zh"] != "undefined" && typeof lang.values["zh"][key] != "undefined") {
        v = lang.values["zh"][key];
    } else if (typeof lang.values["en"] != "undefined" && typeof lang.values["en"][key] != "undefined") {
        v = lang.values["en"][key];
    }
    if (typeof params != "undefined") {
        for (var i in params) {
            if (params.hasOwnProperty(i)) {
                v = v.replace(new RegExp("{" + i + "}", "ig"), params[i]);
            }
        }
    }
    return v;
};

/**
 * Replace all placeholders in html with proper translation values
 * @param {JQuery} el The element to replace values in
 * @param {Widget=} widget If given than use the t() function of the widget
 */
lang.replaceInHtml = function (el, widget) {
    var get = widget ? widget.t : lang.get;
    var elements = el.find("[data-translate]");
    elements.each(function () {
        $(this).html(get($(this).attr("data-translate")));
    });
    elements.removeAttr("data-translate");
    elements = el.find("[data-translate-property]");
    elements.each(function () {
        var s = $(this).attr("data-translate-property").split(",");
        $(this).attr(s[0], get(s[1]));
    });
    elements.removeAttr("data-translate-property");
};

/**
 * The translation values
 * @type {object.<string, object<string, string>>}
 */
lang.values = { "zh": {}, "en": {} };

// Chinese (zh) values - Primary language
lang.values.zh = {
    "users.title": "用户管理",
    "users.username.title": "用户名",
    "users.username.info": "只允许使用 A-Z、数字、- 和 _",
    "users.password.title": "密码",
    "users.password.info": "修改时需要重复输入，编辑用户时可留空。密码将以哈希形式保存",
    "users.admin.title": "管理员",
    "users.admin.info": "管理员可以管理所有内容，普通用户只能管理分配给自己的服务器",
    "users.restrictcommands.title": "限制服务器命令访问",
    "users.restrictcommands.info": "用户无法执行的服务器命令列表（逗号分隔，支持正则表达式）",
    "users.restrictwidgets.title": "禁用组件",
    "users.restrictwidgets.info": "用户在仪表盘中无法看到和使用这些组件",
    "users.readonlyoptions.title": "只读组件选项",
    "users.readonlyoptions.info": "用户无法修改组件选项",
    "users.error.pwmatch": "密码不匹配",
    "users.missing.admin": "数据库中必须至少存在一个管理员",
    "settings.title": "系统设置",
    "servers.title": "服务器管理",
    "servers.name.title": "名称",
    "servers.name.info": "为服务器设置一个名称，将显示在列表中",
    "servers.game.title": "游戏",
    "servers.game.info": "选择服务器对应的游戏",
    "servers.game.other": "其他",
    "servers.host.title": "服务器地址",
    "servers.host.info": "IP 或域名",
    "servers.rcon_port.title": "RCON 端口",
    "servers.rcon_port.info": "RCON 接口端口",
    "servers.rcon_password.title": "RCON 密码",
    "servers.rcon_password.info": "密码将以明文形式存储在数据库中，用于后台任务执行。",
    "servers.active.title": "启用",
    "servers.active.info": "如果禁用，服务器将不会出现在仪表盘中，也不会执行任何后台任务",
    "servers.webrcon.title": "Web Rcon",
    "servers.webrcon.info": "Rust 等游戏提供 Web Rcon 接口。如果服务器启动时使用了 rcon.web 1，请启用此选项。建议使用此功能以获得更好的性能和稳定性。",
    "servers.users.title": "分配用户",
    "servers.users.info": "只有被分配的用户才能看到此服务器",
    "delete.confirm": "确定要删除吗？此操作不可撤销！",
    "login.remember": "记住我",
    "login.title": "欢迎",
    "login.success": "登录成功",
    "login.failed": "登录失败",
    "logout.title": "再见",
    "logout": "退出登录",
    "index.pickserver": "选择服务器",
    "index.addwidget": "添加组件",
    "index.noserver": "请选择一个服务器",
    "index.nowidgets": "还没有添加任何组件，现在开始添加吧",
    "index.serveroffline": "当前选择的服务器已不可用，可能已经离线？",
    "index.widget.delete": "删除此组件",
    "index.widget.size.title": "组件大小",
    "index.widget.size.info": "在布局中的大小",
    "index.widget.size.value.small": "小 | 每行3个",
    "index.widget.size.value.medium": "中 | 每行2个",
    "index.widget.size.value.large": "大 | 每行1个",
    "index.widget.position.title": "组件位置",
    "index.widget.position.info": "组件在布局中的位置顺序（升序）",
    "index.widget.layout.save": "需要刷新页面才能看到更改",
    "index.tooltip.options": "选项",
    "index.tooltip.layout": "布局",
    "index.tooltip.readme": "说明",
    "index.tooltip.content": "组件",
    "index.tooltip.newversion": "有新版本可用",
    "index.widget.error.id": "组件ID必须以a-z字符开头，只能包含：a-z、0-9、-、_",
    "index.widget.add.error": "组件未添加，可能已存在或您没有访问权限",
    "server.disconnect": "RCON服务器已断开连接",
    "widgets.title": "组件管理",
    "widgets.installed": "已安装的组件",
    "widgets.games": "适用于以下游戏",
    "widgets.update.available": "更新到版本 {version}",
    "widgets.update.anyway": "没有可用更新 - 仍然要更新吗？",
    "widgets.update.error.platform": "此平台不支持一键更新。请关闭服务器并在命令行手动运行 'node src/main.js update-all-widgets'",
    "widgets.update.done": "组件更新完成",
    "widgets.update.confirm": "警告：更新前请务必备份。服务器将关闭、安装更新并自动重启。如果出现错误，您可能需要手动启动服务器。",
    "widgets.update.progress": "更新进行中，您将收到服务器断开的消息，稍后应会自动重新加载",
    "widgets.install.error.platform": "此平台不支持一键安装。请关闭服务器并在命令行手动运行 'node src/main.js install-widget repositoryURL'",
    "settings.update": "更新 RCON Web Admin",
    "settings.update.done": "更新完成。您需要手动重启服务器。",
    "settings.update.btn": "立即更新",
    "settings.logs": "RCON Web Admin 日志",
    "settings.logs.info": "如果出现问题，您可能会在此处找到有用的调试信息",
    "settings.log.download": "下载日志文件",
    "settings.update.error.platform": "此平台不支持一键更新。请关闭服务器并在命令行手动运行 'node src/main.js update-core'",
    "core.update": "有更新可用",
    "widget.update": "组件有更新可用",
    "server.cmd.restricted": "您没有权限执行此服务器命令",
    "server.options.restricted": "您没有权限编辑选项",
    "server.widget.restricted": "您没有权限使用此组件",
    "dashboard": "控制面板",
    "cancel": "取消",
    "save": "保存",
    "save.edited": "保存修改",
    "saved": "已保存",
    "delete": "删除",
    "deleted": "已删除",
    "edit": "编辑",
    "edited": "已编辑",
    "submit": "提交",
    "submitted": "已提交",
    "yes": "是",
    "no": "否",
    "on": "开启",
    "off": "关闭",
    "sure": "您确定吗？",
    "modal.ok": "确定",
    "modal.accept": "接受",
    "modal.cancel": "取消",
    "modal.title.alert": "提示",
    "modal.title.confirm": "确认",
    "modal.title.prompt": "输入",
    "access.denied": "访问被拒绝",
    "socket.disconnect": "与后端的连接已断开，5秒后自动尝试重新连接...",
    "show.dismissable": "显示所有已关闭的消息",
    "dismissed.info": "您可以在侧边栏底部找到按钮来重新显示这些消息",
    "widgets.install": "安装新组件",
    "widgets.install.info": "您可以轻松安装用户制作的组件。只需粘贴完整的 GitHub 仓库 URL（包括 https://）。安装过程中 RCON Web Admin 将重启。建议在安装前备份，以防安装损坏的组件。",
    "widgets.install.btn": "立即安装",
    "widgets.install.invalid": "无效的组件仓库",
    "support.creator.tooltip": "非常感谢您的支持。当然您不必捐赠任何东西，这个工具是免费的，将永远免费。",
    "support.creator": "支持开发者"
};

// English (en) values - Fallback
lang.values.en = {
    "users.title": "User Control Center",
    "users.username.title": "Username",
    "users.username.info": "Only A-Z, Numbers, - and _ allowed",
    "users.password.title": "Password",
    "users.password.info": "Repeat it if changed, could be empty when you edit an user. Will be saved as hash",
    "users.admin.title": "Administrator",
    "users.admin.info": "Admin can manage everything, User is only allowed to manage own assigned servers",
    "users.restrictcommands.title": "Restrict access to server commands",
    "users.restrictcommands.info": "Comma separated list of server commands (regex allowed) that this user cannot execute",
    "users.restrictwidgets.title": "Disable widgets",
    "users.restrictwidgets.info": "The user cannot see this widgets in the dashboard. Neither use or add.",
    "users.readonlyoptions.title": "Read-only widget options",
    "users.readonlyoptions.info": "The user cannot change options in the widgets options tab",
    "users.error.pwmatch": "Password did not match",
    "users.missing.admin": "At least one administrator must exist in user database",
    "settings.title": "Settings",
    "servers.title": "Server Management",
    "servers.name.title": "Name",
    "servers.name.info": "Set an individual name for this server, appear in lists",
    "servers.game.title": "Game",
    "servers.game.info": "Select a specific game for this server",
    "servers.game.other": "Other",
    "servers.host.title": "Server Host",
    "servers.host.info": "IP or domain",
    "servers.rcon_port.title": "RCON Port",
    "servers.rcon_port.info": "The port to the RCON interface",
    "servers.rcon_password.title": "RCON Password",
    "servers.rcon_password.info": "Will be stored as cleartext in database. Required to run background cronjobs for scheduled tasks.",
    "servers.active.title": "Active",
    "servers.active.info": "If no than this server is not available in the dashboard and do not execute any backend jobs",
    "servers.webrcon.title": "Web Rcon",
    "servers.webrcon.info": "Rust provide a Web Rcon interface. This must be yes if server is started with rcon.web 1.",
    "servers.users.title": "Assigned users",
    "servers.users.info": "Only the given user's will see this server",
    "delete.confirm": "Are you sure? This cannot be undone!",
    "login.remember": "Remember me",
    "login.title": "Welcome",
    "login.success": "Hello",
    "login.failed": "Login failed",
    "logout.title": "Bye bye",
    "logout": "Logout",
    "index.pickserver": "Pick a server",
    "index.addwidget": "Add a widget",
    "index.noserver": "Please choose a server",
    "index.nowidgets": "No widgets added, time to start with it.",
    "index.serveroffline": "The current selected server is not available anymore. Maybe gone offline?",
    "index.widget.delete": "Delete this widget",
    "index.widget.size.title": "Widget size",
    "index.widget.size.info": "The size in the layout.",
    "index.widget.size.value.small": "Small | 3 per row",
    "index.widget.size.value.medium": "Medium | 2 per row",
    "index.widget.size.value.large": "Large | 1 per row",
    "index.widget.position.title": "Widget position",
    "index.widget.position.info": "The layout position for this widget in ascending order.",
    "index.widget.layout.save": "You need to reload the page to see the changes",
    "index.tooltip.options": "Options",
    "index.tooltip.layout": "Layout",
    "index.tooltip.readme": "Readme",
    "index.tooltip.content": "Widget",
    "index.tooltip.newversion": "A new version is available",
    "index.widget.error.id": "Widget.id must begin with an a-z character and should only contain: a-z, 0-9, -, _",
    "index.widget.add.error": "Widget not added, it does already exist or you don't have access to it",
    "server.disconnect": "Rcon server disconnected",
    "widgets.title": "Widgets",
    "widgets.installed": "Installed widgets",
    "widgets.games": "Available for those games",
    "widgets.update.available": "Update to version {version}",
    "widgets.update.anyway": "No update available - Update anyway?",
    "widgets.update.error.platform": "One click update is not supported on this platform.",
    "widgets.update.done": "Widget update done",
    "widgets.update.confirm": "Warning: Always make a backup before doing this.",
    "widgets.update.progress": "Update in progress",
    "widgets.install.error.platform": "One click installation is not supported on this platform.",
    "settings.update": "Update RCON Web Admin",
    "settings.update.done": "Update done. You have to restart the server manually.",
    "settings.update.btn": "Update now",
    "settings.logs": "RCON Web Admin logfiles",
    "settings.logs.info": "Debug information in logs.",
    "settings.log.download": "Download logfiles",
    "settings.update.error.platform": "One click update is not supported on this platform.",
    "core.update": "Update available",
    "widget.update": "Widget update available",
    "server.cmd.restricted": "You are not allowed to execute this server command",
    "server.options.restricted": "You are not allowed to edit options",
    "server.widget.restricted": "You are not allowed to use this widget",
    "dashboard": "Dashboard",
    "cancel": "Cancel",
    "save": "Save",
    "save.edited": "Save edited data",
    "saved": "Saved",
    "delete": "Delete",
    "deleted": "Deleted",
    "edit": "Edit",
    "edited": "Edited",
    "submit": "Submit",
    "submitted": "Submitted",
    "yes": "Yes",
    "no": "No",
    "on": "On",
    "off": "Off",
    "sure": "Are you sure?",
    "modal.ok": "Ok",
    "modal.accept": "Accept",
    "modal.cancel": "Cancel",
    "modal.title.alert": "Information",
    "modal.title.confirm": "Confirmation",
    "modal.title.prompt": "Prompt",
    "access.denied": "Access denied",
    "socket.disconnect": "Connection to backend closed, automatically trying to reconnect in 5 seconds...",
    "show.dismissable": "Show all dismissed messages again",
    "dismissed.info": "You can view the message again in the sidebar navigation.",
    "widgets.install": "Install a new widget",
    "widgets.install.info": "Paste the full github repository URL to install.",
    "widgets.install.btn": "Install now",
    "widgets.install.invalid": "Invalid widget repository",
    "support.creator.tooltip": "Free forever.",
    "support.creator": "Support creator"
};

/**
 * The current language, default to zh (Chinese)
 * @type {string}
 */
lang.language = "zh";

// check for a other supported language depending on the users defined languages
if (navigator.languages) {
    (function () {
        for (var i = 0; i < navigator.languages.length; i++) {
            var l = navigator.languages[i].split("-")[0]; // Get base language code
            if (typeof lang.values[l] != "undefined") {
                lang.language = l;
                break;
            }
        }
    })();
}