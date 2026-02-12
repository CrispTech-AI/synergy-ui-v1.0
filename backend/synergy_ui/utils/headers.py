from urllib.parse import quote


def include_user_info_headers(headers, user):
    return {
        **headers,
        "X-synergyui-User-Name": quote(user.name, safe=" "),
        "X-synergyui-User-Id": user.id,
        "X-synergyui-User-Email": user.email,
        "X-synergyui-User-Role": user.role,
    }

