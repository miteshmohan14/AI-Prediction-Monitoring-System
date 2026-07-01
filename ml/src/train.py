import joblib

from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

from preprocess import preprocess_data
from config import MODEL_PATH


def train_logistic():
    X_train, X_test, y_train, y_test = preprocess_data()

    model = LogisticRegression(
        max_iter=1000,
        random_state=42
    )

    model.fit(X_train, y_train)

    return model, X_test, y_test


def train_random_forest():
    X_train, X_test, y_train, y_test = preprocess_data()

    model = RandomForestClassifier(
        n_estimators=100,
        random_state=42,
        n_jobs=-1
    )

    model.fit(X_train, y_train)

    return model, X_test, y_test


if __name__ == "__main__":

    model, _, _ = train_random_forest()

    joblib.dump(model, MODEL_PATH)

    print("=" * 60)
    print("Random Forest Trained Successfully")
    print("=" * 60)

    print(f"Saved at:\n{MODEL_PATH}")