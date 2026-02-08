from setuptools import setup, find_packages

setup(
    name="synergy_ui",
    version="0.6.43",
    packages=find_packages(),
    install_requires=[
        "fastapi",
        "uvicorn",
        "loguru",
        "typer",
        "starlette",
    ],
)
