from datetime import datetime
import sys

sys.path.insert(0, "/opt/project")

from airflow import DAG
from airflow.operators.python import PythonOperator

from etl.run_pipeline import main

with DAG(
    dag_id="tech_news_pipeline",
    start_date=datetime(2026, 7, 16),
    schedule="@hourly",
    catchup=False,
    tags=["news", "etl"],
) as dag:

    run_pipeline = PythonOperator(
        task_id="run_pipeline",
        python_callable=main,
    )