import pandas as pd
from config import DATASET_PATH

def load_data():
    """Load the credit card fraud dataset."""
    df = pd.read_csv(DATASET_PATH)
    return df

if __name__ == "__main__":
    df = load_data()

    print("=" * 60)
    print("Dataset Loaded Successfully")
    print("=" * 60)

    print("\nShape:")
    print(df.shape)

    print("\nColumns:")
    print(df.columns.tolist())

    print("\nFirst Five Rows:")
    print(df.head())

    print("\nMissing Values:")
    print(df.isnull().sum())