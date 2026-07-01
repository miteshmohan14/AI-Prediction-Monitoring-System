import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

from data_loader import load_data
from config import SCALER_PATH


def preprocess_data():
    """
    Load and preprocess the dataset.
    """

    # Load dataset
    df = load_data()

    # Features and target
    X = df.drop("Class", axis=1)
    y = df["Class"]

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    # Scale Time and Amount
    scaler = StandardScaler()

    columns_to_scale = ["Time", "Amount"]

    X_train[columns_to_scale] = scaler.fit_transform(
        X_train[columns_to_scale]
    )

    X_test[columns_to_scale] = scaler.transform(
        X_test[columns_to_scale]
    )

    # Save scaler
    joblib.dump(scaler, SCALER_PATH)

    return X_train, X_test, y_train, y_test


if __name__ == "__main__":

    X_train, X_test, y_train, y_test = preprocess_data()

    print("=" * 60)
    print("Preprocessing Completed")
    print("=" * 60)

    print(f"Training Shape : {X_train.shape}")
    print(f"Testing Shape  : {X_test.shape}")

    print("\nFraud Distribution in Training Set")
    print(y_train.value_counts())